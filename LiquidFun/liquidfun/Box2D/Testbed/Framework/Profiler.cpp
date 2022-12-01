#include "Profiler.h"

#include <DbgHelp.h>
#include <intrin.h>
#include <cassert>
#include <fstream>
#include <iostream>
#include <mutex>
#include <map>
#include <vector>
#include <windows.h>
#include <algorithm>

#pragma comment( lib, "dbghelp" )

#define MAXSAMPLENUM 200000

HANDLE Profiler::MainThread_;
DWORD Profiler::MainThreadId_;
std::thread* Profiler::WorkerThread_;

unsigned Profiler::SampleNumber_ = 0;
long long timer = 0;
long long tempTimer = 0;
std::chrono::time_point<std::chrono::steady_clock> timerStart;

std::map<ULONG64, SampleInfo> samples;
std::vector<std::map<ULONG64, SampleInfo>> SampleVector;

	static PSYMBOL_INFO GetSymbol(DWORD64 address, PSYMBOL_INFO buff) {
    PDWORD64 displacement = 0;
    PSYMBOL_INFO symbol = (PSYMBOL_INFO)buff;
    symbol->SizeOfStruct = sizeof(SYMBOL_INFO);
    symbol->MaxNameLen = MAX_SYM_NAME;
    SymFromAddr(GetCurrentProcess(), address, displacement, symbol);
    return symbol;
}

void Profiler::Init() {

    SymSetOptions(SYMOPT_UNDNAME | SYMOPT_DEFERRED_LOADS);
    if (!SymInitialize(GetCurrentProcess(), NULL, true)) {
	return;
    }
    timerStart = std::chrono::high_resolution_clock::now();
}

void Profiler::Start() {

    MainThreadId_ = GetCurrentThreadId();

    MainThread_ = OpenThread(
	THREAD_SUSPEND_RESUME |
	THREAD_GET_CONTEXT |
	THREAD_QUERY_INFORMATION,
	0,
	MainThreadId_
    );

    WorkerThread_ = new std::thread(Sample);
    WorkerThread_->detach();
}

void Profiler::Exit() {

    std::ofstream logFile("ProfileReport.csv");

    logFile << "TimeInterval,Function,HitCount,Percentage,Time(ms),Time/Hit\n";

    const size_t s = SampleVector.size();
    int time_interval = 0;
	if(s > 0)
	{
		for(const auto& v : SampleVector)
		{
            std::map<float, std::pair<const unsigned long long, SampleInfo>, std::greater<>> m;
			for(const auto& data : v)
			{
                unsigned hitCount = data.second.HitCount_;
                float r = static_cast <float> (rand()) / static_cast <float> (RAND_MAX);
                m.insert(std::make_pair((float)hitCount + r, data));
			}
            for(const auto& data : m)
            {
                std::string name = data.second.second.SymbolName_;
                unsigned hitCount = data.second.second.HitCount_;
                double timeDuration = data.second.second.TimeDuration_;
                if (name.empty() || name.find(':') == std::string::npos)
                    continue;
                logFile << time_interval << ",";
                std::string::iterator end_pos = std::remove(name.begin(), name.end(), ',');
                name.erase(end_pos, name.end());
                logFile << name << ",";
                logFile << hitCount << ",";
                logFile << (double)hitCount / (double)MAXSAMPLENUM * 100.0 << ",";
                logFile << timeDuration << ",";
                logFile << timeDuration / (double)hitCount << '\n';
            }
            m.clear();
            ++time_interval;
		}
	}

    logFile.close();
}

void Profiler::Sample() {

    while (SampleNumber_ < MAXSAMPLENUM)
    {
        auto startTime = std::chrono::high_resolution_clock::now();
        auto timerEnd = std::chrono::high_resolution_clock::now();
        timer = std::chrono::duration_cast<std::chrono::seconds>(timerEnd - timerStart).count();

        MainThread_ = OpenThread(
            THREAD_SUSPEND_RESUME |
            THREAD_GET_CONTEXT |
            THREAD_QUERY_INFORMATION,
            0,
            MainThreadId_
        );

        HRESULT result = 0;

        if(MainThread_ != 0)
            result = SuspendThread(MainThread_);

        if (result == 0xffffffff)
        {
            return;
        }

        CONTEXT context = {0};
        context.ContextFlags = WOW64_CONTEXT_i386 | CONTEXT_CONTROL;

        if (MainThread_ != 0)
            result = GetThreadContext(MainThread_, &context);

        if (FAILED(result))
        {
            return;
        }

        if (MainThread_ != 0)
            result = ResumeThread(MainThread_);

        if (FAILED(result))
        {
            return;
        }
        auto endTime = std::chrono::high_resolution_clock::now();

        ULONG64 buff[(sizeof(SYMBOL_INFO) + MAX_SYM_NAME * sizeof(TCHAR) + sizeof(ULONG64) - 1) / sizeof(ULONG64)]; 
        memset(buff, 0, sizeof(buff));

        const PSYMBOL_INFO symbols = GetSymbol(context.Rip, (PSYMBOL_INFO)buff);

        if (tempTimer != timer)
        {
            tempTimer = timer;
            std::cout << tempTimer << std::endl;
            SampleVector.push_back(samples);
            samples.clear();
        }

        ++samples[symbols->Address].HitCount_;
        samples[symbols->Address].Addr_ = symbols->Address;
        samples[symbols->Address].SymbolName_ = symbols->Name;
        samples[symbols->Address].TimeDuration_ += std::chrono::duration< double, std::milli >(endTime - startTime).count();
        samples[symbols->Address].index_ = symbols->TypeIndex;

        std::this_thread::sleep_for(std::chrono::milliseconds(1));

        ++SampleNumber_;
    }
}

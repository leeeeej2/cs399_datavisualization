CS315 - Profiler
----------------

### Continuous Integration Tests  
Edit this document and replace the "liquidfun" with the name of your repository "<_github-repository-name_>" to display the results of your own tests (not of my template). There are two instances to replace in each link. These badges are only updated from main branch, so you will not see the update until your development branch is merged into `main`.  <!-- you can delete this text -->  
[![CMake_Windows_MSVC](https://github.com/DigiPen-CS315/project-6-elliottHong/workflows/CMake_Windows_MSVC/badge.svg)](https://github.com/DigiPen-CS315/project-6-elliottHong/actions)  
[![CMake_Linux_Clang](https://github.com/DigiPen-CS315/project-6-elliottHong/workflows/CMake_Linux_Clang/badge.svg?)](https://github.com/DigiPen-CS315/project-6-elliottHong/actions)  

### Project Documentation: 
- [Project6](https://github.com/DigiPen-CS315/CourseMaterials/tree/main/Projects/Project6)  - Profiler  

### Implementation Details:  
- Implemented sampling profiler that logs how many times each functions are called, its percentage based on total sampling time, and total runtime of functions.

### Integration Details:  
- When program starts to run, it tracks each thread and check which functions are called. In `Sample()` function, it checks each worker thread to log functions that it used that thread.
   
### Requirements  
- Before the main loop of program, it should call `Profiler::Init()` and `Profiler::Start()`. After main loop of program, it should call `Profiler::Exit()` to print `ProfileReport.csv` file. It is able to modify number of sampling time at `Profiler.cpp` with modifing `MAXSAMPLENUM`.

### Output  
- This is sample output of log file.
    function Name          HitCount  Percentage   Time(ms)
    b2Vec2::Length	       20	       0.2	        1.3013
    b2Vec2::LengthSquared	 65	       0.65	        3.7933
    b2Vec2::Normalize	     31	       0.31	        1.7744
    WaveMachine::Step	     2	       0.02	        0.1124
    b2Cross	               6	       0.06	        0.4476
    b2Cross	               5	       0.05	        0.2296
    b2Max	                 58	       0.58	        3.3026
    b2Min	                 79	       0.79	        5.1497
    b2Mul	                 12        0.12	        0.7844


</br>  

* * * * * 

<img src="liquidfun/Box2D/Documentation/Programmers-Guide/html/liquidfun-logo-square-small.png"
alt="LiquidFun logo" style="float:right;" />

LiquidFun Version [1.1.0][]

# Welcome to LiquidFun!

LiquidFun is a 2D physics engine for games.  Go to our
[landing page][] to browse our documentation and see some examples.

LiquidFun is an extension of [Box2D][]. It adds a particle based fluid and soft
body simulation to the rigid body functionality of [Box2D][]. LiquidFun can be
built for many different systems, including Android, iOS, Windows, OS X, Linux,
and JavaScript. Please see `Box2D/Documentation/Building/` for details.

Discuss LiquidFun with other developers and users on the
[LiquidFun Google Group][]. File issues on the [LiquidFun Issues Tracker][]
or post your questions to [stackoverflow.com][] with a mention of
**liquidfun**.

Please see [Box2D/Documentation/Building/][] to learn how to build LiquidFun and
run the testbed.

LiquidFun has a logo that you can use, in your splash screens or documentation,
for example. Please see the [Programmer's Guide][] for the graphics and further
details.

For applications on Google Play that integrate this tool, usage is tracked.
This tracking is done automatically using the embedded version string
(`b2_liquidFunVersionString`), and helps us continue to optimize it. Aside from
consuming a few extra bytes in your application binary, it shouldn't affect
your application at all. We use this information to let us know if LiquidFun
is useful and if we should continue to invest in it. Since this is open
source, you are free to remove the version string but we would appreciate if
you would leave it in.

  [LiquidFun Google Group]: https://groups.google.com/forum/#!forum/liquidfun
  [LiquidFun Issues Tracker]: http://github.com/google/liquidfun/issues
  [stackoverflow.com]: http://www.stackoverflow.com
  [landing page]: http://google.github.io/liquidfun
  [1.1.0]: http://google.github.io/liquidfun/ReleaseNotes.html
  [Box2D]: http://box2d.org
  [Box2D/Documentation/Building/]: http://google.github.io/liquidfun/Building.html
  [Programmer's Guide]: http://google.github.io/liquidfun/Programmers-Guide.html

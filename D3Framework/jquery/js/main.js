/*
    cs399
    uijin.lee
    hagyeong.kim
    assignment6
 */

var margin = { left:80, right:100, top:50, bottom:100 },
    height = 500 - margin.top - margin.bottom, 
    width = 900 - margin.left - margin.right;

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    
var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + 
            ", " + margin.top + ")");

var capitalAmount = [];

// Scales
var x = d3.scaleLinear()
    .domain([-100, 1000])
    .range([0, width]);

var xSvg = svg.append("g")
    .attr("transform", "translate(50, " + (height + 50) + ")")
    .call(d3.axisBottom(x));

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 0.01]);

var ySvg = svg.append("g")
    .attr("transform", "translate(50, 50)")
    .call(d3.axisLeft(y));


var Perc2Bet = $("#percentToBetFromGUI").val();
var BlowChance = $("#chanceOfBlowupFromGUI").val();
var PercBet2Blow = $("#percentOfBetToBlowupFromGUI").val();
var WinMult = $("#winMultiplierFromGUI").val();
var TrialNum = $("#numTrialsFromGUI").val();
var SimsNum = $("#numSimsFromGUI").val();
var binSize = $("#binNumberFromGUI").val();
var kneEp = $("#kernelEpFromGUI").val();

updateSimulation(); //run all simulations and get capital data

var jitterHeight = y.range();
var jitterWidth = 10;

var kde = kernelDensityEstimator(kernelEpanechnikov(kneEp), x.ticks(binSize))
var density = kde(capitalAmount)

var curve = svg
            .append('g')
            .append("path")
            .attr("class", "mypath")
            .datum(density)
            .attr("fill", "#598baf")
            .attr("opacity", ".8")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d", d3.line().curve(d3.curveBasis)
            .x(function(d) {return x(d[0]) + 50;})
            .y(function(d) {return y(d[1]) + 50;})
            );

var graphJitter = svg.append("g")

updateChart();

jitter();

$("#numTrialsFromGUI").on("change",  function(d){
    TrialNum = this.value;
    updateSimulation();
    updateChart();
    jitter();
});
    
$("#numSimsFromGUI").on("change",  function(d){
    SimsNum = this.value;
    updateSimulation();
    updateChart();
    jitter();
});
    
$("#percentToBetFromGUI").on("change",  function(d){
    Perc2Bet = this.value;
    updateSimulation();
    updateChart();
    jitter();
});
    
$("#winMultiplierFromGUI").on("change",  function(d){
    WinMult = this.value;
    updateSimulation();
    updateChart();
    jitter();
});
    
$("#chanceOfBlowupFromGUI").on("change",  function(d){
    BlowChance = this.value;
    updateSimulation();
    updateChart();
    jitter();
});
    
$("#percentOfBetToBlowupFromGUI").on("change",  function(d){
    PercBet2Blow = this.value;
    updateSimulation();
    updateChart();
    jitter();
});
    
$("#binNumberFromGUI").on("change",  function(d){
    binSize = this.value;
    updateSimulation();
    updateChart();
    jitter();
});
    
$("#kernelEpFromGUI").on("change",  function(d){
    kneEp = this.value;
    updateSimulation();
    updateChart();
    jitter();
});

function updateSimulation()
{
    capitalAmount = []

    for(var i = 0; i < SimsNum; i++) // all simulations
    {
        var capital = 100;

        for(var j = 0; j < TrialNum; j++) // place a bet
        {   
            var bet = capital * (Perc2Bet / 100);

            capital -= bet;

            var random = Math.random() * 100;

            if(BlowChance - random >= 0) //lose : lose bet
            {
                bet -= (bet * (PercBet2Blow / 100));
            }
            else //win : get
            {
                bet *= WinMult;
            }
            capital += bet;
        }

        capitalAmount.push(Math.floor(capital));
    }
}

function kernelDensityEstimator(kernel, X)
{
    return function(V){
        return X.map(function(x) {
            return [x, d3.mean(V, function(v) { return kernel(x - v); })];
        });
    };
}

function kernelEpanechnikov(k) {
    return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v*v) / k : 0;
    }
}

function updateChart()
{
    //curve.remove();
    //xSvg.remove();
    //ySvg.remove();

    kde = kernelDensityEstimator(kernelEpanechnikov(kneEp), x.ticks(binSize))
    density = kde(capitalAmount)

    var resizeX = Math.max(...capitalAmount) + 500;
    var resizeY = Math.max(...density.map(function(x){return x[1];}));

    x.domain([-100, resizeX]);

    xSvg.transition().duration(1000)
    .call(d3.axisBottom(x));

    y.domain([0, resizeY]);

    ySvg.transition().duration(1000)
    .call(d3.axisLeft(y));
    
    curve
        .datum(density)
        .transition()
        .duration(1000)
        .attr("d", d3.line().curve(d3.curveBasis)
            .x(function(d) {return x(d[0]) + 50;})
            .y(function(d) {return y(d[1]) + 50;})
        );
}

function jitter()
{
    graphJitter.remove();

    jitterLength = jitterHeight[0] - jitterHeight[1];
    
    graphJitter = svg
    .append("g")
    .selectAll("dot")
    .data(capitalAmount)
    .enter()
    .append("circle")
    .attr("cx", function(d){return(x(d) + width / 100 - Math.random() * jitterWidth ) + 50})
    .attr("cy", function(d){return(Math.random() * jitterLength) + 50})
    .attr("r", 0.5) //each dot size
    .style("fill", "black") // black dots
    .attr("stroke", "black") 
    .style("opacity", 0.2);
}
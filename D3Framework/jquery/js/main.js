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

// Scales
var x = d3.scaleLinear()
    .domain([0, 10])
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

d3.json("data/ProfileReport_DataFix_ver2.json").then(function(data){

    console.log(data);

    data.forEach(function(d){
        d.Mobile_sub_Average = +d.Mobile_sub_Average;
        d.GDP_per_capita_Average = +d.GDP_per_capita_Average;
    });
/*
    d3.interval(function(){
        update(data)
        flag = !flag
    }, 1500);*/

    update(data);
});

    
/*
var Perc2Bet = $("#percentToBetFromGUI").val();
var BlowChance = $("#chanceOfBlowupFromGUI").val();
var PercBet2Blow = $("#percentOfBetToBlowupFromGUI").val();
var WinMult = $("#winMultiplierFromGUI").val();
var TrialNum = $("#numTrialsFromGUI").val();
var SimsNum = $("#numSimsFromGUI").val();
var binSize = $("#binNumberFromGUI").val();
var kneEp = $("#kernelEpFromGUI").val();
*/

//updateSimulation(); //run all simulations and get capital data

/*
$("#numTrialsFromGUI").on("change",  function(d){
    TrialNum = this.value;
    updateSimulation();
    updateChart();
    jitter();
});
*/    

/*
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
*/

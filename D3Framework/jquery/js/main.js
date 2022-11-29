/*
    cs399
    uijin.lee
    hagyeong.kim
    assignment6
 */
var Num = 4;
var Hit = [];
var arrayNum = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

var margin = { left:80, right:100, top:50, bottom:100 };
var height = 500 - margin.top - margin.bottom;
var width = 900 - margin.left - margin.right;

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

var xAxisGroup = svg.append("g")
    .attr("transform", "translate(50, " + (height + 50) + ")")
    .call(d3.axisBottom(x));

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 0.01]);

var yAxisGroup = svg.append("g")
    .attr("transform", "translate(50, 50)")
    .call(d3.axisLeft(y));

d3.json("data/ProfileReport_DataFix_ver2.json").then(function(data){

    calculateHitCountByNum(data);
    updateChart();
});

var Num = $("#numFuncsFromGUI").val();
$("#numFuncsFromGUI").on("change",  function(d){
    Num = this.value;
    //console.log(Num);
    d3.json("data/ProfileReport_DataFix_ver2.json").then(function(data){

        calculateHitCountByNum(data);
        updateChart();
    });
});

function calculateHitCountByNum(data){
    Hit = [];
    for(var i = 0; i < arrayNum.length; i++)
    {
        var a = 0;
        var Limit = 0;
        data[arrayNum[i]].forEach(function(d, Limit){
            //console.log(Num);
            if(Limit < Num)
            {
                //console.log(Limit);   
                a += +d.HitCount;
                Limit += 1;
            }
            d.Hits = +Hit[i];
        })
        Hit.push(a);
        //console.log(Hit[i]);
    }
}

function updateChart(){
    
    var xScale = d3.scaleBand().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

    var resizeY = Math.max(...Hit) + 1;
    y.domain([0, resizeY]);
    xScale.domain(Hit);
    yScale.domain([0, resizeY - 1]);

    yAxisGroup.transition().duration(1000)
    .call(d3.axisLeft(y));

    g.selectAll(".bar").remove();

    g.selectAll(".bar")
    .data(Hit)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d); })
    .attr("y", function(d) { return yScale(d); })
    .attr("width", 50)
    .attr("height", function(d) { return height - yScale(d); });

    console.log(Hit);

}


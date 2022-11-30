/*
    cs399
    uijin.lee
    hagyeong.kim
    assignment6
 */
var Num = 4;
var Hit = [];
var arrayNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

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

d3.csv("data/ProfileReport.csv").then(function(data){
    calculateHitCountByNum(data);
    updateChart();
});

var Num = $("#numFuncsFromGUI").val();
$("#numFuncsFromGUI").on("change",  function(d){
    Num = this.value;
    //console.log(Num);
    d3.csv("data/ProfileReport.csv").then(function(data){

        calculateHitCountByNum(data);
        updateChart();
    });
});

function calculateHitCountByNum(d){
    Hit = [];
    for(var i = 0; i < arrayNum.length; i++)
    {
        var a = 0;
        var Limit = 0;
        d.forEach(function (d){
            if(d["TimeInterval"] == arrayNum[i]){
                //console.log(d.HitCount);
                if(Limit < Num)
                {
                    //console.log(Limit);   
                    a += +d.HitCount;
                    Limit += 1;
                }
                d.Hits = +Hit[i];
                //console.log(+d.HitCount);
            }
        });
        Hit.push(a);
    }

}

function updateChart(){
    //var uniqueValues = d3.map([])
    var newHit = Hit.map(function(val, index){return {key:index, value:val};})
    console.log(newHit);

    var xScale = d3.scaleBand().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

    var resizeY = d3.max(newHit, function(d){return Math.max(d.value);});
    y.domain([0, resizeY]);
    xScale.domain(newHit.map(function(d){return d.key}));
    yScale.domain([0, resizeY - 1]);

    yAxisGroup.transition().duration(1000)
    .call(d3.axisLeft(y));

    
    g.selectAll(".bar").remove();

    g.selectAll(".bar")
    .data(newHit)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.key); })
    .attr("width", xScale.bandwidth())
    .attr("y", function(d) { return yScale(d.value); })
    .attr("width", 50)
    .attr("height", function(d) { return height - yScale(d.value); });

    
    /*
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
*/
   // console.log(Hit);

}


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

var Num = $("#numFuncsFromGUI").val();
$("#numFuncsFromGUI").on("change",  function(d){
    Num = this.value;
    //console.log(Num);
    d3.json("data/ProfileReport_DataFix_ver2.json").then(function(data){

        calculateHitCountByNum(data);
        update();
    });
});

var Hit = [];
var arrayNum = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

d3.json("data/ProfileReport_DataFix_ver2.json").then(function(data){

    calculateHitCountByNum(data);l
    update();
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
        })
        Hit.push(a);
        console.log(Hit[i]);
    }

}

function update(){
    var resizeY = Math.max(...Hit) + 1;

    y.domain([0, resizeY]);

    ySvg.transition().duration(1000)
    .call(d3.axisLeft(y));
}


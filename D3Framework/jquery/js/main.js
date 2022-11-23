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

var Hit = [];
var arrayNum = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

d3.json("data/ProfileReport_DataFix_ver2.json").then(function(data){
    for(var i = 0; i < arrayNum.length; i++)
    {
        var a = 0;
        data[arrayNum[i]].forEach(function(d){
            a += +d.HitCount;
        })
        Hit.push(a);
        console.log(Hit[i]);
    }
    /*var a = 0;
    //console.log(data[arrayNum[0]]);
    data[arrayNum[0]].forEach(function(d){
        a += +d.HitCount;
        //console.log(d.HitCount);
    })
    Hit.push(a);
    console.log(Hit[0]);
    */
    //console.log(data["one"]);
    //console.log(data[arrayNum[0]]);
    //console.log(data[arrayNum[0]].HitCount);
    //data.Hit_count = +data["one"].Hit_count;
    /*for(var i = 0; i < arrayNum.length(); i++)
    {
        console.log(data[arrayNum[i]])
        data[arrayNum[i]].map(function(d){
            var Sum = 0;
            for(var j = 0; j < Num; j++)
            {
                console.log(d[j]);
                //Sum += (+d[j].Hit_count);
            }
            //console.log(Sum);
        })
    }*/
    //console.log(data["one"]);
    //data[]
    update();
});


function update(data){

    
    /*var value = flag ? "Mobile_sub_Average" : "GDP_per_capita_Average";

    x.domain(data.map(function(d){ return d.Continent }));
    y.domain([0, d3.max(data, function(d) { return d[value] })]);

    // X-axis
    var xAxisCall = d3.axisBottom(x);
    g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisCall)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("font-size", "12px")
    
    // Y-axis
    var yAxisCall = d3.axisLeft(y).tickFormat(function(d){ return d; });
    yAxisGroup.transition(t).call(yAxisCall);
        
    var rects = g.selectAll("rect").data(data, function(d){return d.Continent;});

    rects.exit()
        .remove();

    rects.enter()
        .append("rect")
        .attr("x", function(d){ return x(d.Continent) })
        .attr("width", x.bandwidth)
        .attr("y", y(0))
        .attr("height", 0)
        .merge(rects)
        .transition(t)
        .attr("x", function(d){ return x(d.Continent) })
        .attr("width", x.bandwidth)
        .attr("y", function(d){ return y(d[value]); })
        .attr("height", function(d){ return height - y(d[value]); })
        .attr("fill", function(d){ 
            if(d.Continent == "Asia") 
            {
                return colors[4];
            }
            else if(d.Continent == "Americas")
            {
                return colors[0];
            }
            else if(d.Continent == "Europe")
            {
                return colors[2];
            }
            else if(d.Continent == "Oceania")
            {
                return colors[1];
            }
            else if(d.Continent == "Africa")
            {
                return colors[3];
            }
        });
    var label = flag ? "# Mobile Subscriber per 100 people Average " : "GDP Per Capita Average";
    yLabel.text(label);*/
}


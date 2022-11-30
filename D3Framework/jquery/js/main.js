/*
    cs399
    uijin.lee
    hagyeong.kim
    assignment6
 */
var Num = 4;
var Hit = [];

var Ratio0 = d3.map();
var Ratio1 = d3.map();
var Ratio2 = d3.map();
var Ratio3 = d3.map();
var Ratio4 = d3.map();
var Ratio5 = d3.map();
var Ratio6 = d3.map();
var Ratio7 = d3.map();
var Ratio8 = d3.map();
var Ratio9 = d3.map();

var arrayNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

var margin = { left:80, right:100, top:50, bottom:100 };
var height = 500 - margin.top - margin.bottom;
var width = 900 - margin.left - margin.right;
var radius = Math.min(width, height) / 2;

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("radius", radius)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 1500 + margin.top + margin.bottom)
    
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
    Ratio0.clear();
    Ratio1.clear();
    Ratio2.clear();
    Ratio3.clear();
    Ratio4.clear();
    Ratio5.clear();
    Ratio6.clear();
    Ratio7.clear();
    Ratio8.clear();
    Ratio9.clear();

    //console.log("ratio0 is: ");
    //console.log(Ratio0);

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
                    //console.log(d["Time/Hit"]);
                    if(i == 0)
                    {
                        Ratio0.set(d["Function"], d["Time/Hit"]);
                    }
                    else if(i == 1)
                    {
                        Ratio1.set(d["Function"], d["Time/Hit"]);
                    }
                    else if(i == 2)
                    {
                        Ratio2.set(d["Function"], d["Time/Hit"]);
                    }
                    else if(i == 3)
                    {
                        Ratio3.set(d["Function"], d["Time/Hit"]);
                    }
                    else if(i == 4)
                    {
                        Ratio4.set(d["Function"], d["Time/Hit"]);
                    }
                    else if(i == 5)
                    {
                        Ratio5.set(d["Function"], d["Time/Hit"]);
                    }
                    else if(i == 6)
                    {
                        Ratio6.set(d["Function"], d["Time/Hit"]);
                    }
                    else if(i == 7)
                    {
                        Ratio7.set(d["Function"], d["Time/Hit"]);
                    }
                    else if(i == 8)
                    {
                        Ratio8.set(d["Function"], d["Time/Hit"]);
                    }
                    else if(i == 9)
                    {
                        Ratio9.set(d["Function"], d["Time/Hit"]);
                    }
                    Limit += 1;
                }
                d.Hits = +Hit[i];
                //console.log(+d.HitCount);
            }
        });
        Hit.push(a);
    }
    //console.log(Ratio1);
}

function updateChart(){
    //var uniqueValues = d3.map([])
    var newHit = Hit.map(function(val, index){return {key:index, value:val};})
    //console.log(newHit);

    var xScale = d3.scaleBand().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

    var resizeY = d3.max(newHit, function(d){return Math.max(d.value);});
    y.domain([0, resizeY]);
    xScale.domain(newHit.map(function(d){return d.key}));
    yScale.domain([0, resizeY - 1]);

    yAxisGroup.transition().duration(1000)
    .call(d3.axisLeft(y));

    var div = d3.select("body")
    .append("div")
    .style("opacity", "0");
    
    var ordScale = d3.scaleOrdinal()
    .domain(newHit)
    .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72'])
    .range(d3.schemeDark2);
    
    g.selectAll(".bar").remove(); 

    g.selectAll(".bar")
    .data(newHit)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.key) - 30; })
    //.attr("y", function(d) { return height; })
    .attr("width", xScale.bandwidth())
    .on("mouseover", function(d)
    {
        d3.select(this)
            .transition()
            .duration("50")
            .attr("opacity", "0.3");

        div.transition()
            .duration("50")
            .attr("opacity", "1");
        
        //draw pop up pie chart
        var pie = d3.pie().value(function(d) { 
                return d.value; 
            });

        var d_ = pie(d3.entries(Ratio0))

        switch(d.key) {
            case 0:
                d_ = pie(d3.entries(Ratio0))
                break;
            case 1:
                d_ = pie(d3.entries(Ratio1))
                break;
            case 2:
                d_ = pie(d3.entries(Ratio2))
                break;
            case 3:
                d_ = pie(d3.entries(Ratio3))
                break;
            case 4:
                d_ = pie(d3.entries(Ratio4))
                break;
            case 5:
                d_ = pie(d3.entries(Ratio5))
                break;
            case 6:
                d_ = pie(d3.entries(Ratio6))
                break;
            case 7:
                d_ = pie(d3.entries(Ratio7))
                break;
            case 8:
                d_ = pie(d3.entries(Ratio8))
                break;
            case 9:
                d_ = pie(d3.entries(Ratio9))
                break;
            default:
                // code block
            }

        var arc = g.selectAll("arc")
                   .data(pie(d_))
                   .enter();
        
        var path = d3.arc()
                    .innerRadius(radius * 0.5)
                    .outerRadius(radius * 0.8)
                    .padAngle(.02)
                    .padRadius(100)
                    .cornerRadius(2);

        var outerArc = d3.arc()
                .innerRadius(radius * 0.9)
                .outerRadius(radius * 0.9);

        arc.append("path")
         .attr("d", path)
         .attr("fill", function(d) { return ordScale(d.data.value); })
         .attr("transform", "translate(" + (width / 2 - 50) + "," + height * 1.7 + ")");

        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        arc.append("text")
            .attr("transform", function(d) { 
            return "translate(" + label.centroid(d) + ")"; 
            })
            .text(function(d) { return d.data.key; })
            .style("font-family", "arial")
            .style("font-size", 15);

        g.selectAll('allPolylines')
            .data(d_)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', function(d) {
                var posA = path.centroid(d) 
                var posB = outerArc.centroid(d) 
                var posC = outerArc.centroid(d); 
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 
                posC[0] = radius * 0.95 * (midangle < 3.14 ? 1 : -1); 
                return [posA, posB, posC]
            })
            .attr("transform", "translate(" + (width / 2 - 50) + "," + height * 1.7 + ")");
            
            console.log(d_);

        g.selectAll('allLabels')
            .data(d_)
            .enter()
            .append('text')
            .attr("class", "labelText")
            .text( function(d) { if(d.value === d.value) {console.log(d.data.key) ; return d.data.key }} )
            .attr('transform', function(d) {
                  var pos2 = outerArc.centroid(d);
                  //console.log(pos);
                  var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                  pos2[0] = radius * 0.99 * (midangle < 3.14 ? 1 : -1) + (width / 2 - 50);
                  pos2[1] += height * 1.7;
                  return 'translate(' + pos2 + ')';
                })
            .style('text-anchor', function(d) {
                  var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                  return (midangle < 3.14 ? 'start' : 'end')
              });
        /////////////////////
        
        g.append("text")
                .attr("class", "value")
                .attr("x", function(){return xScale(d.key) - 30;})
                .attr("y", function(){return yScale(d.value);})
                .text(function(){return d.value});
    })
    .on("mouseout", function(d)
    {
        d3.select(this)
            .transition()
            .duration("50")
            .attr("opacity", "1");

        div.transition()
            .duration("50")
            .attr("opacity", "0");

        d3.selectAll(".value")
            .remove();
        
        d3.selectAll("path")
            .remove();

        d3.selectAll("arc")
            .exit()
            .remove();

        d3.selectAll("polyline")
            .remove();

        d3.selectAll(".labelText")
            .remove();

        arc.exit()
          .remove()
    })
    //.transition()
    //.duration(1000)
    .attr("y", function(d) { return yScale(d.value); })
    .attr("width", width/10)
    .attr("height", function(d) { return height - yScale(d.value); })
    .attr("fill", function(d) { return ordScale(d.value); });
}


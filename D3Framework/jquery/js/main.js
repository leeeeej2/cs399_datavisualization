    var margins = { left:100, right:40, top:50, bottom:80};

    var width = 800 - margins.left - margins.right;
    var height = 600 - margins.top - margins.bottom;
    
    var arrayNum = ["0~1", "1~2","2~3","3~4","4~5","5~6","6~7","7~8", "8~9", "9~10", "11~12", "12~13", "13~14", "14~15", "15~16", "16~17", "17~18", "18~19", "19~20"];
    var currNmu = 1;
    
    //var svg = d3.select("#chart-area")
    //    .append("svg")
    //    .attr("width", width + margin.left + margin.right)
    //    .attr("height", height + margin.top + margin.bottom)
        
    //var g = svg.append("g")
    //        .attr("transform", "translate(" + margin.left + 
    //            ", " + margin.top + ")");
    
    var g = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + margins.left + margins.right)
        .attr("height", height + margins.top + margins.bottom)
        .append("g")
        .attr("transform", "translate(" + margins.left + ", " + margins.top  + ")");
    
    //var yAxisGroup = g.append("g")
    //    .attr("class", "y axis");
    
    // Scales
    //var x = d3.scaleLinear()
    //    .domain([-100, 1000])
    //    .range([0, width]);
    
    //var xSvg = svg.append("g")
    //    .attr("transform", "translate(50, " + (height + 50) + ")")
    //    .call(d3.axisBottom(x));
    
    //var y = d3.scaleLinear()
    //    .range([height, 0])
    //    .domain([0, 0.01]);
    
    //var ySvg = svg.append("g")
    //    .attr("transform", "translate(50, 50)")
    //    .call(d3.axisLeft(y));
    
    g.append("text")
        .attr("class", "x axis-label")
        .attr("x", width / 2)
        .attr("y", height + (margins.bottom / 2))
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .text("Time interval");
    
    //y axis-label
    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", -height / 2)
        .attr("y", -60)
        .attr("fons-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Hit Count");
    
        g.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0)
        .style("font-size", "16px") 
        .attr("text-anchor", "middle")  
        .style("text-decoration", "underline")  
        .text("I am Hagyeong Kim");
    
    d3.json("data/ProfileReport_DataFix_ver2.json").then(function(data){
    
        console.log(data[arrayNum[currNmu]]);
        
        data[arrayNum[currNmu]].forEach(function(d){
            d.Hit_count = +d.Hit_count;
        });
    
        //console.log(data[arrayNum[currNmu]]);
    
        updateChart(data[arrayNum[currNmu]]);
    });
    
    
    function updateChart(data)
    {
        //kde = kernelDensityEstimator(kernelEpanechnikov(kneEp), x.ticks(binSize))
        //density = kde(capitalAmount)
    
        //var resizeX = Math.max(...capitalAmount) + 500;
        //var resizeY = Math.max(...density.map(function(x){return x[1];}));
    
        //x.domain([-100, resizeX]);
    
        //xSvg.transition().duration(1000)
        //.call(d3.axisBottom(x));
    
        //y.domain([0, resizeY]);
    
        //ySvg.transition().duration(1000)
        //.call(d3.axisLeft(y));
        
        //curve
        //.datum(density)
        //.transition()
        //.duration(1000)
        //.attr("d", d3.line().curve(d3.curveBasis)
        //    .x(function(d) {return x(d[0]) + 50;})
        //    .y(function(d) {return y(d[1]) + 50;})
        //);
    
        var x = d3.scaleBand() 
            .domain(data.map(function(d){ return d.Time_interval; })) 
            .range([0, width])                                
            .paddingInner(0.3)
            .paddingOuter(0.3);
    
        var y = d3.scaleLinear() 
            .domain([0, d3.max(data, function(d){ return d.Hit_Count })]) 
            .range([height, 0]);    
    
        // X-axis
        var xAxisCall = d3.axisBottom(x);
        
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxisCall)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");

        var yAxisCall = d3.axisLeft(y)
            .ticks(10); 

        g.append("g")
            .attr("class", "y-axis")
            .call(yAxisCall);

        var rects = g.selectAll("rect")
            .data(data);
    
        rects.enter()
            .append("rect")
            .attr("x", function(d){ return x(d.Time_interval) })
            .attr("y", function(d){ return y(d.Hit_Count); })
            .attr("width", x.bandwidth)
            .attr("height", function(d){ return height - y(d.Hit_Count); })
            .attr("fill", "grey");
    }
    
    
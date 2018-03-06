var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// var pro = d3.geoAlbersUsa();

// var path = d3.geoPath();

var projection = d3.geo.albers()
    .rotate([96, 0])
    .center([-.6, 38.7])
    .parallels([29.5, 45.5])
    .scale(1070)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var x = d3.scale.linear()
    .domain([1, 10])
    .rangeRound([600, 860]);

// var color = d3.scale.threshold()
//     .domain(d3.range(2, 10))
//     .range(d3.scheme.blues[9]);

var size = d3.scale.linear().range([2, 25]);

// var g = svg.append("g")
//     .call(d3.zoom()
//     .scaleExtent([1 / 2, 4])
//     .on("zoom", zoomed));

// function zoomed() {
//     g.attr("transform", d3.event.transform);
// }

// Define the div for the tooltip
var div = d3.select("#vis").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
  
// var g = svg.append("g")
//     .attr("class", "key")
//     .attr("transform", "translate(0,40)");

// g.selectAll("rect")
//   .data(color.range().map(function(d) {
//       d = color.invertExtent(d);
//       if (d[0] == null) d[0] = x.domain()[0];
//       if (d[1] == null) d[1] = x.domain()[1];
//       return d;
//     }))
//   .enter().append("rect")
//     .attr("height", 8)
//     .attr("x", function(d) { return x(d[0]); })
//     .attr("width", function(d) { return x(d[1]) - x(d[0]); })
//     .attr("fill", function(d) { return color(d[0]); });

// g.append("text")
//     .attr("class", "caption")
//     .attr("x", x.range()[0])
//     .attr("y", -6)
//     .attr("fill", "#000")
//     .attr("text-anchor", "start")
//     .attr("font-weight", "bold")
//     .text("Unemployment rate");

// g.call(d3.axisBottom(x)
//     .tickSize(13)
//     .tickFormat(function(x, i) { return i ? x : x + "%"; })
//     .tickValues(color.domain()))
//   .select(".domain")
//     .remove();
// d3.queue()
//     .defer(d3.json, "data/us-10m.v1.json")
//     .defer(d3.json, "data/protests.json")
//     .await(ready);
d3.json("data/us-10m.v1.json", function(error, us) {

    d3.json("data/protests.json", function(error, protests) {
        size.domain([0, d3.max(protests, function(d) { return d.partict; })]);
    //console.log(protests);

    // build map path
    svg.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
        .attr("fill", "blue") // TODO: figure out how to do this without color func above?
        .attr("d", path);
    // add states from topojson
    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "states")
        .attr("d", path);
    });
});
// function ready(error, us, protests) {
//     if (error) throw error;
//         // points
//     // aa = [-122, 47];
//     // bb = [-122.389809, 37.72728];

//     // // states = topojson.feature(us, us.objects.states).features
//     // console.log(pro(aa),pro(bb));
//     size.domain([0, d3.max(protests, function(d) { return d.partict; })]);
//     //console.log(protests);

//     // build map path
//     g.append("g")
//         .attr("class", "counties")
//         .selectAll("path")
//         .data(topojson.feature(us, us.objects.counties).features)
//         .enter().append("path")
//         .attr("fill", color(3)) // TODO: figure out how to do this without color func above?
//         .attr("d", path);
//     // add states from topojson
//     g.append("path")
//         .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//         .attr("class", "states")
//         .attr("d", path);

//     // svg.append("circle")
//     //     .data([aa,bb]).enter()
//     //     .attr("cx")
//     var defaultFill = "red";
//   //add a dot
//   g.selectAll("circle")
// 		.data(protests).enter()
//         .append("circle")
//         .attr("cx", function (d) { return projection(JSON.parse(d.location))[0]; })
// 		.attr("cy", function (d) { return projection(JSON.parse(d.location))[1]; })
//         .attr("r", function (d) { return size(d.partict); })
//         .attr("fill", "red")
//         .on("mouseover", function(d){
//             d3.select(this)
//             .attr("fill", "orange");
//             console.log(d);
//             div.transition()		
//                 .duration(200)		
//                 .style("opacity", .9);		
//             div.html("HELLO")	
//                 .style("left", (d3.event.pageX) + "px")		
//                 .style("top", (d3.event.pageY - 28) + "px");	
//             })
//             // var prop = d.properties;
      
//             // var string = "<p><strong>Market Area Name</strong>: " + prop.dma1 + "</p>";
//             // string += "<p><strong>Homes with TVs</strong>: " + numberWithCommas(prop["TV Homes"]) + "</p>";
//             // string += "<p><strong>% with Cable</strong>: " + prop.cableperc + "%</p>";
//             // string += "<p><strong>Nielsen Rank</strong>: " + prop.Rank + "</p>";
      
//             // d3.select("#textbox")
//             //   .html("")
//             //   .append("text")
//             //   .html(string)
//           .on("mouseout", function(d){
//             d3.select(this)
//             .attr("fill", defaultFill)
//           });
      
// }
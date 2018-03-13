var svg = d3.select("svg"),
    // margin = {top: 20, right: 20, bottom: 110, left: 40},
    // margin2 = {top: 430, right: 20, bottom: 30, left: 40},
    // width = +svg.attr("width") - margin.left - margin.right,
    // height = +svg.attr("height") - margin.top - margin.bottom,
    // height2 = +svg.attr("height") - margin2.top - margin2.bottom;
    height = +svg.attr("height"),
    width = +svg.attr("width");


var projection = d3.geoAlbersUsa().scale(1280).translate([width/2, height/2]);;

var path = d3.geoPath();

// var x = d3.scaleLinear()
//     .domain([1, 10])
//     .rangeRound([600, 860]);

var parseDate = d3.timeParse("%Y");

// define the size for the dots
var size = d3.scaleLinear().range([2, 25]);

var context = svg.append("g")
    .attr("class", "context")
    //.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")

d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
    d3.json("data/protests.json", function(error, protests) {
        if (error) throw error;

        // set the domain for the dots
        size.domain([0, d3.max(protests, function(d) { return d.partict; })]);
        // x2.domain(d3.extent(protests, function(d) { return +d.rptyy; }));
        // y2.domain([0, d3.max(protests, function(d) { return +d.partict; })]);
        // // add the bottom context data
        // context.append("path")
        //     .datum(protests)
        //     .attr("class", "area")
        //     .attr("d", area2);


        // svg.append("rect")
        //     .attr("class", "zoom")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        // svg.append("path")
        //     .attr("class", "counties")
        //     .attr("stroke", "#aaa")
        //     .attr("stroke-width", 0.5)
        //     .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); })));

        // svg.append("path")
        //     .attr("class", "states")
        //     .attr("stroke-width", 0.5)
        //     .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

        // svg.append("path")
        //     .attr("class", "nation")
        //     .attr("d", path(topojson.feature(us, us.objects.nation)));
        
        svg.append("g")
            .attr("class", "counties")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("fill", "#6baed6") // TODO: figure out how to do this without color func above?
            .attr("d", path);
        // add states from topojson
        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "states")
            .attr("d", path);
        svg.append("g").selectAll("circle")
            .data(protests).enter()
            .append("circle")
            .attr("cx", function (d) { return projection(JSON.parse(d.location))[0]; })
            .attr("cy", function (d) { return projection(JSON.parse(d.location))[1]; })
            .attr("r", function (d) { return size(d.partict); })
            .attr("fill", "red")

            .on("click", function(d) {
                d3.select(this)
                .attr("fill", "orange");
                console.log(d); // TODO: tooltip for the data
            })
    });
});

// d3.json("data/us-10m.v1.json", function(error, us) {
//     d3.json("data/protests.json", function(error, protests) {
//         size.domain([0, d3.max(protests, function(d) { return d.partict; })]);

//     // build map path
//     svg.append("path")
//       .attr("stroke", "#aaa")
//       .attr("stroke-width", 0.5)
//       .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); })));

//   svg.append("path")
//       .attr("stroke-width", 0.5)
//       .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

// //   svg.append("path")
// //       .attr("d", path(topojson.feature(us, us.objects.nation)));

    // g.append("g")
    //     .attr("class", "counties")
    //     .selectAll("path")
    //     .data(topojson.feature(us, us.objects.counties).features)
    //     .enter().append("path")
    //     .attr("fill", "blue") // TODO: figure out how to do this without color func above?
    //     .attr("d", path);
    // // add states from topojson
    // g.append("path")
    //     .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    //     .attr("class", "states")
    //     .attr("d", path);
      //add a dot
//     g.selectAll("circle")
//         .data(protests).enter()
//         .append("circle")
//         .attr("cx", function (d) { return projection(JSON.parse(d.location))[0]; })
//         .attr("cy", function (d) { return projection(JSON.parse(d.location))[1]; })
//         .attr("r", function (d) { return size(d.partict); })
//         .attr("fill", "red")
//         // .on("mouseover", function(d){
//         //     d3.select(this)
//         //     .attr("fill", "orange");
//         //     console.log(d);
//         //     div.transition()		
//         //         .duration(200)		
//         //         .style("opacity", .9);		
//         //     div.html("HELLO")	
//         //         .style("left", (d3.event.pageX) + "px")		
//         //         .style("top", (d3.event.pageY - 28) + "px");	
//         //     })
//         //     .on("mouseout", function(d){
//         //     d3.select(this)
//         //     .attr("fill", defaultFill)
//         //     });

//     });
// });

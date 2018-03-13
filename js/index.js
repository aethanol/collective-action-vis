var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 110, left: 40},
    margin2 = {top: 530, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    height2 = +svg.attr("height") - margin2.top - margin2.bottom,
    // height = +svg.attr("height"),
    // width = +svg.attr("width");
    // get the svg height and width to set the projection.. kinda janky
    ogw = +svg.attr("width"),
    ogh = +svg.attr("height");

// define the projection and map path
var projection = d3.geoAlbersUsa().scale(1280).translate([960/2, 600/2]);
var path = d3.geoPath();

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height2, 0]);

var xAxis = d3.axisBottom(x);

var parseDate = d3.timeParse("%Y");

// define the size for the dots
var size = d3.scaleLinear().range([2, 25]);

// area curve for the protests over years
var area = d3.area()
    .curve(d3.curveCardinal)
    .x(function(d) { return x(parseDate(d.year)); })
    .y0(height2)
    .y1(function(d) { return y(d.parti); });

// path clipping?
svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

var map = svg.append("g")
    .attr("class", "map")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")

d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
    // load the protests data to put on map
    d3.json("data/protests.json", function(error, protests) {
        d3.json('data/protest_years.json', function(data) {
            if (error) throw error;

            // set the x and y domain for the context graph
            x.domain(d3.extent(data, function(d) { return parseDate(d.year); }));
            y.domain([0, d3.max(data, function(d) { return d.parti; })]);
            // set the domain for the dots
            size.domain([0, d3.max(protests, function(d) { return d.partict; })]);
            // make the area plot for the protests over years
            context.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);
            
             // add the axis
            context.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height2 + ")")
                .attr("fill", "#000")
                .call(xAxis);
            
            // svg.append("rect")
            //     .attr("class", "zoom")
            //     .attr("width", width)
            //     .attr("height", height)
            //     //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            //     .call(zoom);
            
            // ###### add the map
            map.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter().append("path")
                .attr("fill", "#6baed6") // TODO: figure out how to do this without color func above?
                .attr("d", path);
            // add states from topojson
            map.append("path")
                .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                .attr("class", "states")
                .attr("d", path);

            map.append("g").selectAll("circle")
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
            // #########
        });
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

(function() {

  'use strict';


  var margin = 30,
  width = parseInt(d3.select("#chart").style("width")) - margin * 2,
  height = parseInt(d3.select("#chart").style("height")) - (margin )  * 2;
  
  var data = [];

  var loadData =function loadData(callback) {
    d3.json("/live2", function(error, datajson) {
      data.push(datajson.data);
      d3.map(data);
      

      callback();
    });
  }
   
  var n = 30,
  random = d3.random.normal(0, .1);

  //d3.range(n).map(random);
  //d3.range(30);


  var x = d3.scale.linear()
  .domain([1, 5])
  .range([0, width]);

  var y = d3.scale.linear()
  .domain([0, 50])
  .range([height, 0])
  .nice();

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("right");


  var line = d3.svg.line()
  .interpolate("basis")
  .x(function(d, i) { return x(i); })
  .y(function(d, i) { return y(d); });


  // var temperatura = d3.select("#temperatura .numero .valor")
  //     .datum(data)
  //     .html(function d(){d.Temperatura});

  var chart = d3.select("#chart")
  .attr("width", width + margin*2)
  .attr("height", height + margin*2)
  .attr("shape-rendering","optimizeSpeed")
  .attr("color-rendering","optimizeSpeed")
  .append("g")
  .attr("transform", "translate(" + margin + "," + margin + ")");

  chart.append("defs").append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", width)
  .attr("height", height);

  chart.append("g")
  .attr("class", "y axis")
  .call(yAxis);

  var path = chart.append("g")
  .attr("clip-path", "url(#clip)")
  .append("path")
  .datum(data)
  .attr("class", "line")
  .attr("d", line);

  
  tick();

  function tick() {

    // push a new data point onto the back
    
    
    loadData(function (dataJson) {
      // redraw the line, and slide it to the left
      
      // var translate = (15 * data.length );
      
      // path
      // .attr("d", line)
      // .attr("transform", null)
      // .transition()
      // .duration(150)
      // .ease("linear")
      // .attr("transform", "translate(" +  translate + ",0)")
      // .each("end", tick);
      // d3.select(".valor").datum(data[data.length -1]).html(function d(messure) {
      //   return messure;
      // });
      
       // push a new data point onto the back
      data.push(data[data.length -1]);

      // pop the old data point off the front
      data.shift();

      // transition the line
      path.transition()
          .duration(1550)
          .ease("linear")
          .attr("d", line)
          .each("end", function() { tick(path, line, data); });
          
      d3.select(".valor").datum(data[data.length -1]).html(function d(messure) {
         return messure;
       });

    // pop the old data point off the front
    

  });

    
  }

})()
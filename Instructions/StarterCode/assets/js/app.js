// @TODO: YOUR CODE HERE!
// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("./assets/data/data.csv").then(function(x) {
    console.log(x)

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    x.forEach(function(y) {
       y.poverty = +y.poverty;
       y.healthcareLow = +y.healthcareLow;

     });
     
     
    // // Step 2: Create scale functions
    // // ==============================
    var xLinearScale = d3.scaleLinear()
       .domain([d3.min(x, d => d.poverty) - 1, d3.max(x, d => d.poverty)])
       .range([0, width]);

       //d3.min(x, d => d.poverty) makes our x-min value correspond to min of dataset not absolute origin value
    var yLinearScale = d3.scaleLinear()
       .domain([d3.min(x, d => d.healthcareLow) - 1, d3.max(x, d => d.healthcareLow)])
       .range([height, 0]);

     //d3.min(x, d => d.healthcareLow)makes our y-min value correspond to min of dataset not absolute origin value
    // // Step 3: Create axis functions
    // // ==============================
     var bottomAxis = d3.axisBottom(xLinearScale);
     var leftAxis = d3.axisLeft(yLinearScale);


    // // Step 4: Append Axes to the chart
    // // ==============================
     chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // // Step 5: Create Circles
    // // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(x)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcareLow))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".4");

    
        ///Create axes labels

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%) ");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });

const width = 800;
const height = 400;
const padding = 40;

// Select the svg element with id="chart" and set its width and height
const svg = d3.select("#chart").attr("width", width).attr("height", height);

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
d3.json(url).then((data) => {
  const dataset = data.data;

  // Create the x-axis scale using dates
  const xScale = d3
    .scaleTime()
    .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0])])
    .range([padding, width - padding]);

  // Create the y-axis scale using linear GDP values
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([height - padding, padding]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);

  // Calculate the width of each bar based on the number of data points
  const barWidth = (width - 2 * padding) / dataset.length - 1;

  const tooltip = d3.select("#tooltip");

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(new Date(d[0])))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", barWidth)
    .attr("height", (d) => height - padding - yScale(d[1]))
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("fill", "steelblue")
    .on("mouseover", function (event, d) {
      tooltip
        .style("opacity", 0.9)
        .attr("data-date", d[0])
        .html(`${d[0]}<br>$${d[1].toLocaleString()} Billion`)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });
});

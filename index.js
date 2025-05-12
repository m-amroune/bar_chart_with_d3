const width = 800;
const height = 400;
const padding = 40;

const svg = d3.select("#chart").attr("width", width).attr("height", height);

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
d3.json(url).then(data => {
    const dataset = data.data;
 


const xScale = d3.scaleTime().domain([dataset[0][0], new Date(dataset[dataset.length - 1][0])]).range([padding], [width - padding]);

  const yScale = d3.scaleLinear().domain([0, d3.max(dataset, d => d[1])]).range([height - padding, padding]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

 svg.append("g").attr("id", "x-axis").attr("transform", `translate(0, ${height - padding})`).call(xAxis);

  svg.append("g").attr("id", "y-axis").attr("transform", `translate(${padding}, 0)`).call(yAxis);
} )
const width = 800;
const height = 400;
const padding = 40;

const svg = d3.select("#chart").attr("width", width).attr("height", height);

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
d3.json(url).then(data => {
    const dataset = data.data;
    console.log(dataset)
} )


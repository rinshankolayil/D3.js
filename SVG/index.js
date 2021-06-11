var DUMMY_DATA = [
    { id: 'id1', value: 10, region: 'India' },
    { id: 'id2', value: 8, region: 'USA' },
    { id: 'id3', value: 12, region: 'Qatar' },
    { id: 'id4', value: 6, region: 'Germany' },
]
const xScale = d3.scaleBand()
    .domain(DUMMY_DATA.map((datapoint => datapoint.region)))
    .rangeRound([0, 250])
    .padding(0.1);
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0])
const container = d3.select('svg')
    .classed('container', true)

const bars_svg = container.selectAll('.bar')
    .data(DUMMY_DATA)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', 50)
    .attr('height', data => 200 - yScale(data.value)) // 200 minus because we have to start from bottm
    .attr('x', data => xScale(data.region))
    .attr('y', data => yScale(data.value))

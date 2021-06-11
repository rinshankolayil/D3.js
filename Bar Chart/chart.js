var DUMMY_DATA = [
    { id: 'id1', value: 10, region: 'India' },
    { id: 'id2', value: 7, region: 'USA' },
    { id: 'id3', value: 12, region: 'Qatar' },
    { id: 'id4', value: 6, region: 'Germany' },
]

const MARGIN = { top: 20, bottom: 10 };
const CHART_HEIGHT = 400 - MARGIN.top - MARGIN.bottom;
const CHART_WIDTH = 600;
let selectedData = DUMMY_DATA;
const x = d3.scaleBand()
    .rangeRound([0, CHART_WIDTH])
    .padding(0.1)

const y = d3.scaleLinear()
    .range([CHART_HEIGHT, 0]) // SINCE range start from position:0 we start position from CHART_HEIGHT

x.domain(DUMMY_DATA.map((d) => d.region))
y.domain([0, d3.max(DUMMY_DATA, d => d.value) + 3]) // MAX_VALUE 12 + 3 (Some additional space)
const chartContainer = d3
    .select('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT + MARGIN.top + MARGIN.bottom);
const chart = chartContainer.append('g') //GROUP TOGETHER SVG ELEM
chart.append('g')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr('transform', `translate(0,${CHART_HEIGHT})`)
    .attr('color', '#4f009e');
renderChart()
function renderChart() {
    chart.selectAll('.bar')
        .data(selectedData, data => data.id)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('width', x.bandwidth())
        .attr('height', data => CHART_HEIGHT - y(data.value))
        .attr('x', data => x(data.region)) //MENTIONED IN DOMAIN
        .attr('y', data => y(data.value))
    chart.selectAll('.bar').data(selectedData,data => data.id).exit().remove()
    chart.selectAll('.label')
        .data(selectedData, data => data.id)
        .enter()
        .append('text')
        .text(data => data.value)
        .attr('x', data => x(data.region) + x.bandwidth() / 2) //TEXT STARTTING FROM CENTER
        .attr('y', data => y(data.value) - 20) // LITTLE TOP 20 pX
        .attr('text-anchor', 'middle')
        .classed('label', true)
    chart.selectAll('.label').data(selectedData,data => data.id).exit().remove()
}
let unselectedIds = []
const listItems = d3.select('#data')
    .select('ul')
    .selectAll('li')
    .data(DUMMY_DATA)
    .enter()
    .append('li');

listItems.append('span').text((data) => data.region)

listItems.append('input')
    .attr('type', 'checkbox')
    .attr('checked', true)
    .on('change', (e, data) => {
        if (unselectedIds.indexOf(data.id) === -1) {
            unselectedIds.push(data.id);
        }
        else {
            unselectedIds = unselectedIds.filter(id => id !== data.id);
        }
        console.log(unselectedIds)
        selectedData = DUMMY_DATA.filter(
            (d) => unselectedIds.indexOf(d.id) === -1
        );
        console.log(selectedData)
        renderChart()
    });

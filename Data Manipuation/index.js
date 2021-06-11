var DUMMY_DATA = [
    { id: 'id1', value: 10, region: 'India' },
    { id: 'id2', value: 11, region: 'USA' },
    { id: 'id3', value: 12, region: 'Qatar' },
    { id: 'id4', value: 13, region: 'Germany' },
]

d3.select('.a').selectAll('p').data([1, 2, 3]).enter().append('p').text(dta => dta);
d3.select('.b').selectAll('p').data(DUMMY_DATA).enter().append('p').text(dta => dta.region);

const container = d3.select('#c').classed('container', true).style('border', '1px solid red')

const bars = container.selectAll('.bar')
    .data(DUMMY_DATA)
    .enter()
    .append('div')
    .classed('bar', true)
    .style('width', '50px')
    .style('height', data => (data.value * 15) + 'px')

const countryData = {
    items: ['India', 'China', 'USA'],
    removeItem(index) {
        this.items.splice(index, 1)
    },
    addItems(itemname) {
        this.items.push(itemname)
    },
    updateItem(itemname, index) {
        this.items[index] = itemname
    }
}

d3.select("ul")
    .selectAll('li')
    .data(countryData.items, data => data)
    .enter()
    .append('li')
    .classed('list-group-item',true)
    .text(data => data);

setTimeout(() => {
    countryData.addItems('Germany');
    d3.select("ul")
        .selectAll('li')
        .data(countryData.items, data => data)
        .enter()
        .append('li')
        .classed('added list-group-item', true)
        .text(data => data);
}, 2000);


setTimeout(() => {
    countryData.removeItem(0);
    d3.select("ul")
        .selectAll('li')
        .data(countryData.items, data => data)
        .exit()
        .style('background-color', 'red')
        .remove() //Remove from DOM
}, 4000);


setTimeout(() => {
    countryData.updateItem('Qatar', 1);
    d3.select("ul")
        .selectAll('li')
        .data(countryData.items, data => data)
        .exit()
        .style('background-color', 'orange')
        .text('Qatar')
}, 6000);

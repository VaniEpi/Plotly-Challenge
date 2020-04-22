
init();

// ============================================
function init() {
    d3.json('samples.json').then( data => {
        var sel = d3.select('select');

        data.names.forEach( name => {
            sel.append('option').text(name).attr('value',name);
        });

        showPanel(data.names[0]);
        showBars(data.names[0]);
        showBubbles(data.names[0]);
    });
};

function showPanel(name) {
    var panel = d3.select('#sample-metadata');

    panel.html('');

    d3.json('samples.json').then( data => {
        var metadata = data.metadata.filter( obj => obj.id == name )[0];

        Object.entries(metadata).forEach(([key,value]) => {
            panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });
    });
};

function optionChanged(name) {
    showPanel(name);
    showBars(name);
    showBubbles(name);
};

function showBars(name) {
    d3.json('samples.json').then( data => {
        var sample = data.samples.filter( obj => obj.id == name )[0];

        var barData = [
            {
                y: sample.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
                x: sample.sample_values.slice(0,10).reverse(),
                text: sample.otu_labels.slice(0,10).reverse(),
                type: 'bar',
                orientation: 'h'
            }
        ];

        var barLayout = {
            title: 'Top 10 Bacteria Cultures Found',
            margin: { t:30, l:150 }
        };

        Plotly.newPlot('bar', barData, barLayout);
    });
};

function showBubbles(name) {
    d3.json('samples.json').then( data => {
        var sample = data.samples.filter( obj => obj.id == name )[0];

        var bubbleData = [
            {
                x: sample.otu_ids,
                y: sample.sample_values,
                text: sample.otu_labels,
                mode: 'markers',
                marker: {
                    size: sample.sample_values,
                    color: sample.otu_ids,
                    colorscale: 'Earth'
                }
            }
        ];

        var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            margin: { t:0 },
            hovermode: 'closest',
            xaxis: {title: 'OTU ID'},
            margin: { t: 30 }
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
};
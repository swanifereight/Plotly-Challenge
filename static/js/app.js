function buildMetadata(sample) {
	d3.json("data/samples.json", function(error,data){
		if(error) {
			return console.warn(error);
		}
	d3.select("body")
	.selectAll("p")
	.data(data)
	.enter()
	.append("p")
	.text(function(d) {
		return d.name + "," + d.location;
	})
		var metadata = data.metatdata;
		var resultArr = metadata.filter(sampleObj => sampleObj.id == sample);
		var result = resultArr[0];
		var PANEL = d3.select("#sample-metadata");

		PANEL.html("");

		Object.entries(result).forEach(([key, value]) => {
			PANEL.append("h6").text(`${key.toUpperCase()}; ${value}`);
		});
	});
}
function buildCharts(sample){
	d3.json("/data/samples.json").then((data) => {
		var samples = data.samples;
		var resultArr = samples.filter(sampleObj => sampleObj.id == sample);
		var result = resultArr[0];
		var otu_ids = result.otu_ids;
		var otu_labels = result.otu_labels;
		sample_values = result.sample_values;

		var bubbleChart = {
			title: "Bacteria Cultures per Sample",
			margin: { t:0},
			hovermode: "closest",
			xaxis: {title: "OTU ID"},
			margin: {t:30}
		};

		var bubbleD = [
		{
			x: otu_ids,
			y: sample_values,
			text: otu_labels,
			mode: "markers",
			marker: {
				size: sample_values,
				color: otu_ids,
				colorscale: "Earth"
			}

		}
		];
	Plotly.newPlot("bubble", bubbleD, bubbleChart);

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}
		
function init() {

  var selector = d3.select("#selDataset");
  d3.json("/data/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {

  buildCharts(newSample);
  buildMetadata(newSample);
}
init();

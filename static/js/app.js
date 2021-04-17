function buildMetadata(sample) {
	d3.json("samples.json").then((data) => {
		var metadata = data.metatdata;
		var resultArr = metadata.filter(sampleObj.id == sample);
		var result = resultArr[0];
		var PANEL = d3.select("#sample-metadata");

		PANEL.html("");
		Object.entries(result).forEach(([key, value]) => {
			PANEL.append("h6").text(`${key.toUpperCase()}; ${value}`);
		});
		buildGauge(result.wfreq);
	});
}
function buildCharts(sample){
	d3.json("samples.json").then((data) => {
		var samples = data.samples;
		var resultArr = samples.filter(sampleObj => sampleObj.id ==sample);
		var result = resultArr[0];
		
	});
}
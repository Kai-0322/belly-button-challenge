// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let array = metadata.filter(obj => obj.id == sample);
    let result = array[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let array = samples.filter(obj => obj.id == sample);
    let result = array[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;

    // Build a Bubble Chart
    let bubbleLayout = {
      title: 'Bubble Chart',
      xaxis: {
        title: 'OTU IDs'
      },
      yaxis: {
        title: 'Sample Values'
      },
      showlegend: false,
      height: 800,
      width: 800
    };

    // Render the Bubble Chart
    let bubbleData = [{
      x: otuIds,
      y: sampleValues,
      type: "bubble",
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: 'Earth',
        opacity: 0.6
      },
      text: otuLabels
        
  }];
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let y_ticks = otuIds.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barData = [{
      x: sampleValues,
      y: y_ticks,
      type: 'bar',
      orientation: "h",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: 'Earth',
        opacity: 0.6
      },
      text: otuLabels
    }];

    // Render the Bar Chart
    let barLayout = {
      title: 'Bar Chart',
      x_axis: {
        title: 'OTU IDs'
      },
      y_axis: {
        title: 'Sample Values'
      },
      showlegend: false,
      height: 800,
      width: 800
    };
    Plotly.newPlot("bar", barData, barLayout)
  });
};

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name
    names.forEach((sample) => {
      dropdownMenu.append("option").text(sample).property("value", sample);
    });

    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();

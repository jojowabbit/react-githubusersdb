import React from "react";
// import fc libraries
import FusionCharts from "fusioncharts";
// import fc components
import ReactFC from "react-fusioncharts";
// import fc chart type
import Charts from "fusioncharts/fusioncharts.charts";
// include fc theme
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChartComponents = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stars per Languages",
        theme: "candy",
        doughtnutRadius: "45%",
        showPercentValues: 0,
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};
export default ChartComponents;

import React from "react";
// import fc libraries
import FusionCharts from "fusioncharts";
// import fc components
import ReactFC from "react-fusioncharts";
// import fc chart type
import Charts from "fusioncharts/fusioncharts.charts";
// include fc theme
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChartComponents = ({ data }) => {
  const chartConfigs = {
    type: "pie3d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Languages",
        theme: "fusion",
        decimals: 0,
        pieRadius: "45%",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};
export default ChartComponents;

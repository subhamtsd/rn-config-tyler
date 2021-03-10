/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { Text } from "react-native";
import {
  // PieChartConfig,
  PieData,
  LineData,
  ProgressData,
  BarData,
  StackedData,
  ContributionData,
  ChartConfig,
  ChartStyles,
  screenWidth,
  ChartHeight,
  Ylabel,
} from "../examples/data";

const Empty = () => <Text>Sorry type not match</Text>;

export const Charting = (props) => {
  const type = props.type;
  switch (type) {
    case "pie":
      const { PieChart } = require("react-native-chart-kit");
      // import()
      return (
        <PieChart
          data={props.data}
          width={screenWidth}
          height={ChartHeight}
          chartConfig={props.ChartConfig}
          style={ChartStyles}
          accessor="recovery"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute={false}
        />
      );
      break;
    case "line":
      const { LineChart } = require("react-native-chart-kit");

      return (
        <LineChart
          data={LineData}
          width={screenWidth}
          height={ChartHeight}
          chartConfig={ChartConfig}
          style={ChartStyles}
          // bezier // uncomment if want curvy lines
        />
      );
      break;
    case "progress":
      const { ProgressChart } = require("react-native-chart-kit");
      return (
        <ProgressChart
          data={ProgressData}
          width={screenWidth}
          height={ChartHeight}
          chartConfig={ChartConfig}
          style={ChartStyles}
        />
      );
      break;
    case "bar":
      const { BarChart } = require("react-native-chart-kit");
      return (
        <BarChart
          data={BarData}
          width={screenWidth}
          height={ChartHeight}
          yAxisLabel={Ylabel}
          chartConfig={ChartConfig}
          style={ChartStyles}
        />
      );
      break;
    case "stacked":
      const { StackedBarChart } = require("react-native-chart-kit");
      return (
        <StackedBarChart
          data={StackedData}
          width={screenWidth}
          height={ChartHeight}
          chartConfig={ChartConfig}
          style={ChartStyles}
        />
      );
      break;
    case "contribution":
      const { ContributionGraph } = require("react-native-chart-kit");
      return (
        <ContributionGraph
          values={ContributionData}
          endDate={new Date("2019-04-01")}
          numDays={105}
          width={screenWidth}
          height={ChartHeight}
          chartConfig={ChartConfig}
        />
      );
    default:
      return <Empty />;
  }
};

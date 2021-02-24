/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { Text } from "react-native";
import {
  PieChart,
  LineChart,
  ProgressChart,
  BarChart,
} from "react-native-chart-kit";
import {
  PieData,
  PieChartConfig,
  ChartStyles,
  LineData,
  screenWidth,
  LineChartConfig,
  ProgressChartConfig,
  ProgressData,
  BarData,
  BarChartConfig,
} from "../examples/data";

const Empty = () => <Text>Sorry type not match</Text>;

export const Charting = (props) => {
  const type = props.type;
  switch (type) {
    case "pie":
      return (
        <PieChart
          data={props.data}
          width={screenWidth}
          height={400}
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
      return (
        <LineChart
          data={LineData}
          width={screenWidth}
          height={420}
          chartConfig={LineChartConfig}
          style={ChartStyles}
        />
      );
      break;
    case "progress":
      return (
        <ProgressChart
          data={ProgressData}
          width={screenWidth}
          height={220}
          chartConfig={ProgressChartConfig}
          style={ChartStyles}
        />
      );
      break;
    case "bar":
      return (
        <BarChart
          data={BarData}
          width={screenWidth}
          height={220}
          yAxisLabel={"Rs"}
          chartConfig={BarChartConfig}
          style={ChartStyles}
        />
      );
      break;
    default:
      return <Empty />;
  }
};

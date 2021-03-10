import { Dimensions } from "react-native";

export const screenWidth = 450;

export const ChartHeight = 250;

export const Ylabel = "$";

export const PieData = [
  {
    name: "Total cases",
    recovery: 107890656,
    color: "grey",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Total deaths",
    recovery: 2365917,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Total recoverd",
    recovery: 79913802,
    color: "yellow",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Active cases",
    recovery: 25462431,
    color: "green",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Closed cases",
    recovery: 82428225,
    color: "orange",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

export const PieChartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "red",
  backgroundGradientTo: "blue",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export const ChartStyles = {
  marginVertical: 8,
  borderRadius: 16,
};

export const ChartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "#eff3ff",
  backgroundGradientTo: "#efefef",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export const LineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      strokeWidth: 2,
    },
  ],
};

export const LineChartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "#eff3ff",
  backgroundGradientTo: "#efefef",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export const ProgressData = [0.4, 0.6, 0.8];

export const ProgressChartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "#eff3ff",
  backgroundGradientTo: "#efefef",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export const BarData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

export const BarChartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "#eff3ff",
  backgroundGradientTo: "#efefef",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export const StackedData = {
  labels: ["Test1", "Test2"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 60, 60],
    [30, 30, 60],
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
};

export const StakedCHartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "#eff3ff",
  backgroundGradientTo: "#efefef",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export const ContributionData = [
  { date: "2019-01-02", count: 1 },
  { date: "2019-01-03", count: 2 },
  { date: "2019-01-04", count: 3 },
  { date: "2019-01-05", count: 4 },
  { date: "2019-01-06", count: 5 },
  { date: "2019-01-30", count: 2 },
  { date: "2019-01-31", count: 3 },
  { date: "2019-03-01", count: 2 },
  { date: "2019-04-02", count: 4 },
  { date: "2019-03-05", count: 2 },
  { date: "2019-02-30", count: 4 },
];

export const ContributionChartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "#eff3ff",
  backgroundGradientTo: "#efefef",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

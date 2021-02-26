import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width - 16;

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

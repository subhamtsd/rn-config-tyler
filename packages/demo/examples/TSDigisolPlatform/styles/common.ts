import { Dimensions } from "react-native";

export const colStyle = {
  borderWidth: 1,
  borderColor: "cyan",
};

export const rowStyle = {
  borderWidth: 1,
  borderColor: "red",
};

export const style1 = {
  borderWidth: 1,
  borderColor: "yellow",
};

export const gridStyle = {
  borderWidth: 1,
  borderColor: "blue",
  // minHeight: 500,
};

export const componentGridStyle = {
  flex: 1,
  borderWidth: 0,
  // minHeight: Dimensions.get("window").height - 85,
  padding: 10,
  margin: 15,
  minWidth: Dimensions.get("window").width / 4,
  maxHeight: 500,
  borderTopWidth: 1,
  borderTopColor: "#c5c5c5",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 5,
};

export const styles = {
  container: {
    marginTop: 25,
    padding: 10,
  },
  tabName: {
    color: "white",
  },
  header: {
    fontSize: 20,
    backgroundColor: "skyblue",
    marginTop: 10,
    padding: 15,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "coral",
  },
  subNavItem: {
    padding: 15,
  },
  topic: {
    textAlign: "center",
    fontSize: 15,
  },
};

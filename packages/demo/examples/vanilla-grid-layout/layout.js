import React from "react";
import { Text, View } from "react-native";

const styles = {};

export const routes = {};

const Home = ({ label }) => {
  return (
    <View>
      <Text style={{}}>Home *** {label}</Text>
    </View>
  );
};

const About = ({ label }) => {
  return (
    <View>
      <Text style={{}}>About *** {label}</Text>
    </View>
  );
};

export const componentsSet = {
  Home,
  About,
};

export const appConfig = {
  componentsSet,
  links: {
    "/": {
      style: styles.navItem,
      linkStyle: styles.tabName,
      linkText: "Home",
    },
    "/about": {
      style: styles.navItem,
      linkStyle: styles.tabName,
      linkText: "Feed",
    },
    "/contact": {
      style: styles.navItem,
      linkStyle: styles.tabName,
      linkText: "Messages",
    },
  },
  layout: {
    // row no
    0: {
      // col no
      0: {
        layout: {
          colConfig: {
            colSize: 5,
            height: "100vh",
          },
          0: {
            0: {
              // col no
              idx: "Home",
              label: "left-nav",
              colStyle: { borderWidth: 1, height: "20vh" },
            },
          },
          1: {
            0: {
              // col no
              idx: "About",
              label: "footer",
              colStyle: { borderWidth: 4, height: "51vh" },
            },
          },
        },
      },
      1: {
        layout: {
          colConfig: {
            colSize: 12,
            height: "100vh",
          },
          0: {
            0: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "body-header",
              colStyle: {
                borderWidth: 2,
                borderColor: "yellow",
                height: "10vh",
              },
            },
          },
          1: {
            0: {
              layout: {
                colConfig: {
                  colStyle: {
                    borderWidth: 2,
                    borderColor: "yellow",
                    height: "80vh",
                  },
                },
                0: {
                  0: {
                    // col no
                    colSize: 1,
                    idx: "Home",
                    label: "body-content-1",
                    colStyle: {
                      borderWidth: 2,
                      borderColor: "yellow",
                    },
                  },
                  1: {
                    // col no
                    colSize: 13,
                    idx: "Home",
                    label: "body-content-2",
                    colStyle: {
                      borderWidth: 5,
                      borderColor: "red",
                    },
                  },
                },
              },
            },
          },
          2: {
            0: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "body-footer",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
        },
      },
    },
  },
};


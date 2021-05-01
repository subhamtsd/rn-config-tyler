// const {defaults} = require('jest-config');
const esModules = ["react-native", "@react-native-community"].join("|");
module.exports = {
  // ...defaults,
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|@storybook)",
  ],
  reporters: ["default"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

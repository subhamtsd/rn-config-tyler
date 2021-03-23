/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  About,
  ActionComp,
  Comp5,
  Home,
  RandomPic,
  JsonForm,
} from "../../components";
import { rowStyle, styles } from "../common";
// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  JsonForm,
};
// components section
const _formData = {
  phone: 8654787549,
  otp: 654789,
};
const schema = {
  type: "object",
  properties: {
    phone: { type: "number" },
    otp: { type: "number" },
  },
};
const uiSchema = {
  phone: {
    "ui:title": "Phone No. ",
  },
};
export const routes = {};

// *************************************************
//  Layout config
// *************************************************

export const appConfig = {
  componentsSet,
  layout: {
    "1.container": {
      "1.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 3,
            colStyle: { backgroundColor: "grey" },
          },
          "1.1.leftNavHeaderRow": {

            leftNavHeader: {
              colSize: 1,
              idx: "Home",
              label: "leftNavHeader",
              colStyle: {
                borderColor: "cyan",
                borderWidth: 4,
                height: "100vh",
                backgroundColor: "lightgreen",
              },
            },
          },
        },
      },
      "1.2.bodyCol": {

        layout: {
          colConfig: {
            colSize: 11,
            colStyle: {
              backgroundColor: "grey",
            },
          },
          "1.2.1.bodyHeaderRow": {
            bodyHeader: {
              colSize: 1,
              idx: "JsonForm",
              label: "bodyHeader",
              colStyle: {
                borderColor: "cyan",
                alignSelf: "center",
                borderWidth: 4,
                height: "80vh",
                backgroundColor: "skyblue",
              },
              passProps: {
                _formData,
                schema,
                uiSchema,
                _onSuccess: (e) => { },
              },
            },
          },
        },
      },
    },
  },
};
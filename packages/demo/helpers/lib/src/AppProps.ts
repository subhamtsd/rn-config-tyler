import { ReactChildren } from "react";
import { StyleSheetProperties } from "react-native";

export const FuncDefault = () => {
  /* */
};

// prop definituion of App in App.tsx
export interface AppProps {
  config: JSON;
  setStateAsync: Function;
  routes?: JSON;
  setLayoutConfig?: Function;
  getEvents?: Function;
  getInitEvents?: Function;
}

// prop definituion of UXColumn in App.tsx
export interface UXColumnProps {
  label: string;
  key: string;
  idx: string;
  style: StyleSheetProperties;
  colStyle: StyleSheetProperties;
  colSize: number;
  children: ReactChildren;
  passProps: JSON;
  appState: JSON;
  setAppState: Function;
  setLayoutConfig: Function;
  colClass: JSON;
}

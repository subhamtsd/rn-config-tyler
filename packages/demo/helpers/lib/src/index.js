import merge from "deepmerge";
import { object } from "dot-object";

export { App } from "./container/App";
export { JSONEditor } from "./components/JSONEditor";
export { styles, rowStyle } from "./styles";

export const setAppState = (s) => merge(appState, s);

// export { render } from "./router";

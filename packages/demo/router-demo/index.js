// ****** EXAMPLE CONFIGS START ****************
// FIXME: fix the component mount stage example with <label>-$init logic fix
/*** example with json based forms  */
const configs = {
  "with-charts": "with-charts",
  "with-jsonforms": "with-jsonforms",
  "another-grid": "another-grid",
  "3_4-screen-example-mobile": "3_4-screen-example-mobile",
  "3_4-screen-example-web": "3_4-screen-example-web",
  "with-calendar": "with-calendar",
  "component-mount": "component-mount",
  "todo-app": "todo-app",
  "with-appstate": "with-appstate",
  "with-setLayout": "with-setLayout",
  "with-setLayout (without hide)": "with-setLayout (without hide)",
  "collapsible-leftnav": "collapsible-leftnav",
};
const selected = "3_4-screen-example-mobile";
// eslint-disable-next-line @typescript-eslint/no-var-requires
let moduleConfig = require(`../examples/${configs[selected]}/layout`);

const getComponents = moduleConfig.getComponents;
const fetchConfig = moduleConfig.fetchConfig;

// ****** EXAMPLE CONFIGS END ****.************
import React from "react";
import { registerRootComponent } from "expo";

// INFO: use the npmjs version of routing module
import { App, init } from "rn-config-tyler";

// INFO: if wanted to switch to current code version which is unpublished as a module, 
// comment the above one (npmjs rn-config-tyler import) if using below one
// import { App, init } from "../helpers/lib/src";

// eslint-disable-next-line @typescript-eslint/no-var-requires
init(moduleConfig, fetchConfig, getComponents).then((passProps) => {
  registerRootComponent(() => <App debug={true} {...passProps} />);
});

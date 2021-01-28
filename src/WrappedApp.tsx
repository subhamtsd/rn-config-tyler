// import { registerRootComponent } from "expo";
import merge from "deepmerge";
import { object } from "dot-object";
import React from "react";

// ****** EXAMPLE CONFIGS START ****************
// import { appConfig, routes } from "../examples/sagar-poc/layout"; /// example with button clicks and routing with dynamic changes to screen

// import {
//   appConfig,
//   routes,
// } from "../examples/react-router-port/layout"; /// starter example with nav bars and changes to content area
import { appConfig, routes } from "../examples/app-one/layout"; /// example with button clicks and routing with dynamic changes to screen
// import { appConfig, routes } from "../examples/app-two/layout"; /// another example with changes
// ****** EXAMPLE CONFIGS END ****************

import { GridSection } from "./App";
import { JSONEditor } from "./internal/components/JSONEditor";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

//  overall container app
export default class WrappedApp extends React.Component {
  constructor() {
    super();
    this.state = {
      config: appConfig
    };
    // console.log(this.state.config);
  }

  render() {
    return (
      <>
        <JSONEditor
          json={this.state?.config}
          onChangeJSON={(json) => {
            // TODO: add schema conformation for JSONEditor values of component names
            this.setState({ config: json }, () => {
              //
            });
          }}
        />
        <GridSection
          layoutConfig={this?.state?.config}
          routes={routes}
          setLayoutConfig={(config, isDottedFormat = false) => {
            // TODO: find out if the object is in collapsed/dotted format
            if (isDottedFormat) {
              // expand to proper JSON from dotted notation
              config = object(config);
            }
            this.setState(
              {
                // TODO: fix thois to be possible with only identifier
                config: merge(this?.state?.config, { layout: config })
              },
              () => {
                console.log(this?.state?.config);
              }
            );
          }}
        />
      </>
    );
  }
}
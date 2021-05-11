import merge from "deepmerge";
import { object } from "dot-object";
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

// logic to update layout config (which is stored in config state var)
export const setLayoutConfig = (
  setConfig,
  config,
  _config,
  format = "none"
) => {
  console.log(config)
  console.log(_config)


  // find out if the object is in collapsed/dotted format
  if (format === "dotted") {
    // expand to proper JSON from dotted notation
    _config = object(_config);
    setConfig(
      merge(
        config,
        {
          layout: _config,
        },
        { arrayMerge: overwriteMerge }
      )
    );
  } else if (format === "copy") {
    // copy into current, no merge
    setConfig({ ...config, layout: _config });
  } else if (format === "sustain") {
    // copy from current
    _config = config;
    setConfig(
      merge(config, {
        layout: _config,
      })
    );
  } else {
    setConfig(
      merge(
        config,
        {
          layout: _config,
        },
        { arrayMerge: overwriteMerge }
      )
    );
  }
};


export const setAppState = (_setAppState, appState, newAppState, format="none") => {
  if (format === "isPartial") {
    _setAppState(merge(appState, newAppState, { arrayMerge: overwriteMerge })); ///ui,children,props
  }
  else {
    _setAppState(newAppState);
  }
};

export const setGlobalState = (
  _setAppState,
  appState,
  newAppState,
  format = "none"
) => {
  if (format === "isPartial") {
    //newAppState will be overWrite by initial
    _setAppState(
      merge(appState, { $global: newAppState }, { arrayMerge: overwriteMerge })
    );
  } else if (format == "mo") {
    //newAppState(not in global) will merge with appState
    _setAppState(merge(appState, newAppState, { arrayMerge: overwriteMerge }));
  } else if (format === "copy") {
    //newAppState will be merge with initial
    _setAppState(merge(appState, { $global: newAppState }));
  } else {
    //whatever will be pass new that will stay
    _setAppState({
      ui: appState.ui,
      children: appState.children,
      props: appState.props,
      $global: newAppState,
    });
  }
};

// export const setGlobalState = (
//   _setGlobalState,
//     globalState,
//     newAppState,
//     format = "none"
//   ) => {
//     // let clonedAppState =newAppState
//     // delete newAppState.ui
//     if (format === "isPartial") {
//       _setGlobalState({
//         ui: globalState.ui,
//         children: globalState.children,
//         props: globalState.props,
//         $global: merge(globalState, {$global: newAppState}, { arrayMerge: overwriteMerge }),
//       });
//     }else if(format === "copy"){
//       _setGlobalState(
//       //   {
//       //   ui: appState.ui,
//       //   children: appState.children,
//       //   props: appState.props,
//       //   $global: merge(appState, {$global: newAppState}),
//       //   // $global: merge(appState, newAppState)

//       // })
//         merge(globalState,{$global: newAppState}));
//     }
//     //whatever will be pass new that will stay
//     else {
//       _setGlobalState({
//         ui: globalState.ui,
//         children: globalState.children,
//         props: globalState.props,
//         $global: newAppState,
//       });
//     }
//   };

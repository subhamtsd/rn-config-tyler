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

// export const setAppState = (_setAppState, appState, newAppState, format="none") => {
//   if (format === "isPartial") {
//     _setAppState(merge(appState, newAppState, { arrayMerge: overwriteMerge })); ///ui,children,props
//   }
//   }else {
//     _setAppState(newAppState);
//   }
// };

export const setAppState = (
_setAppState,
  appState,
  newAppState,
  format = "none"
) => {
  // let clonedAppState =newAppState
  // delete newAppState.ui
  if (format === "isPartial") {
    _setAppState({
      ui: appState.ui,
      children: appState.children,
      props: appState.props,
      $global: merge(appState, {$global: newAppState}, { arrayMerge: overwriteMerge }),
    }); 
  }else if(format === "copy"){
    _setAppState(
    //   {
    //   ui: appState.ui,
    //   children: appState.children,
    //   props: appState.props,
    //   $global: merge(appState, {$global: newAppState}),
    //   // $global: merge(appState, newAppState)

    // })
      merge(appState,{$global: newAppState}));
  }
  //whatever will be pass new that will stay 
  else {
    _setAppState({
      ui: appState.ui,
      children: appState.children,
      props: appState.props,
      $global: newAppState,
    });
  }
};


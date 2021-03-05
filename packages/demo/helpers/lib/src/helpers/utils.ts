// initialize the props to be passed
const noOp = () => {
  /* */
};

export const init = (
  moduleConfig = {},
  fetchConfig = null,
  getComponentsSet
) => {
  const passProps = {
    config: moduleConfig?.appConfig,
    routes: moduleConfig?.routes,
    getEvents: moduleConfig?.getEvents || noOp,
    getInitEvents: moduleConfig?.getInitEvents || noOp,
  };
  return new Promise((resolve, reject) => {
    if (fetchConfig) {
      return fetch(fetchConfig.url, { headers: { ...fetchConfig.headers } })
        .then((_data) => {
          return _data.json();
        })
        .then((data) => {
          const { appConfig, routes } = data;
          const componentsSet = getComponentsSet();
          appConfig.componentsSet = componentsSet;
          passProps.config = appConfig;
          console.log(passProps);
          return resolve(passProps);
        });
    } else {
      return resolve(passProps);
    }
  });
};

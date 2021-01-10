import { createStore } from "redux";

// redux action
export function action(idxArr, payload) {
  return {
    type: "ACTION_TRIGGER",
    ui: {
      ...payload.ui
    },
    idxArr,
    data: payload
  };
}

// redux reducer
export function reducer(state = [], action) {
  switch (action.type) {
    case "ACTION_TRIGGER":
      return {
        ...state,
        ui: {
          ...state.ui,
          [action.idxArr[0]]: action.ui[0],
          [action.idxArr[1]]: action.ui[1]
        },
        children: {
          ...state.children,
          [action.idxArr[0]]: action.data.children && action.data.children[0],
          [action.idxArr[1]]: action.data.children && action.data.children[1]
        }
      };
    default:
      return state;
  }
}

// redux store
export const store = createStore(reducer, {});

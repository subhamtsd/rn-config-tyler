import { createStore } from "redux";

// redux action
export function action(idx, idxArr, payload) {
  return {
    type: "ACTION_TRIGGER",
    ui: payload.ui,
    idx,
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
        ui: { [action.idxArr[0]]: action.ui, [action.idxArr[1]]: action.ui }
      };
    default:
      return state;
  }
}

// redux store
export const store = createStore(reducer, {});

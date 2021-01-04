import { createStore } from "redux";

// redux action
export function action(idx, payload) {
  return {
    type: "ACTION_TRIGGER",
    ui: payload.ui,
    idx,
    data: payload
  };
}

// redux reducer
export function reducer(state = [], action) {
  switch (action.type) {
    case "ACTION_TRIGGER":
      return { ...state, ui: { "5555": action.ui, "99999": action.ui } };
    default:
      return state;
  }
}

// redux store
export const store = createStore(reducer, {});

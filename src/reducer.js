import {saveUserToken} from "./App";

export function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {...state, isLoading: action.payload};

      case "image":
      return {...state, image: action.payload};

    case "showSuccess":
      return {...state, showSuccess: action.payload};

    case "error":
      return {...state, error: action.payload};
    default:
      throw new Error();
  }
}

export function appReducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {...state, isLoading: action.payload};
    case "error":
      return {...state, error: action.payload};
    case "setToken":
      saveUserToken(action.payload);
      return {...state, token: action.payload};
    default:
      throw new Error();
  }
}
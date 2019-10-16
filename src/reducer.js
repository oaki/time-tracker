export function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {...state, isLoading: action.payload};
    case "error":
      return {...state, error: action.payload};
    default:
      throw new Error();
  }
}
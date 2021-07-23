const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return !state;
    case "SIGN_OFF":
      return state;
    default:
      return state;
  }
};

export default loggedReducer;

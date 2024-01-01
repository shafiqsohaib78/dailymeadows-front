const initialState = {
  counterData: 1,
  token: "",
  isAuthenticated: null,
  isLoading: false,
  isRendered: false,
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        isLoading: true,
        isRendered: false,
      };
    case "USER_LOADED":
      localStorage.setItem("_token_auth_user", action.payload.token);
      localStorage.setItem("_app_userId", action.payload.user.id);
      localStorage.setItem("latestAction", "Success");

      return {
        ...state,

        user: action.payload.user,
        isAuthenticated: true,
        isRendered: true,
        isLoading: false,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("_token_auth_user", action.payload.token);
      localStorage.setItem("_app_userId", action.payload.user.id);
      localStorage.setItem("latestAction", "Success");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isRendered: true,
        isLoading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_USER":
      localStorage.removeItem("_token_auth_user");
      localStorage.removeItem("_app_userId");
      localStorage.setItem("latestAction", "FAIL");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        isRendered: false,
      };
    default:
      return state;
  }
};
export default reducer;

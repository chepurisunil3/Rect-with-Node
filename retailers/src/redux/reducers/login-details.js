import { userDetails } from "../defaults/user-details";

export const LoginDetailsReducer = (
  state = { ...userDetails },
  { type, payload }
) => {
  switch (type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
    case "USER_DETAILS":
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isLoggedIn: true, isLoading: false };
    case "LOGIN_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...userDetails };
    default:
      return state;
  }
};

import { removeAuthToken } from "../../utils/auth";
import fetcher from "../../utils/data-fetch";

export const registerUser = (data) => async (dispatch) => {
  dispatch({ ...data });
};

export const getUser = () => async (dispatch) => {
  try {
    const response = await fetcher("http://localhost:3001/retailers/getUser");
    if (response.status === 200) {
      let resp = await response.json();
      resp = resp.data;
      resp.token = localStorage.token;
      dispatch({
        type: "USER_DETAILS",
        payload: resp,
      });
    } else {
      removeAuthToken();
    }
  } catch (e) {
    console.log(e);
  }
};

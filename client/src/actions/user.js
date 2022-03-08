import axios from "axios";
import { apiUrls } from "../utils/apiUrls";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  GET_USER_DETAIL_SUCCESS,
} from "./actionType";

export function login(data) {
  return (dispatch) => {
    const url = apiUrls.login();
    axios
      .post(url, data)
      .then((response) => dispatch(loginSuccess(response)))
      .catch((error) => dispatch(loginFailed(error.response.data)));
  };
}

function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    userDetail: response.data.user,
  };
}

function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error: error.error,
  };
  console.log(error);
}

export function getUserDetail() {
  return (dispatch) => {
    const url = apiUrls.getUser();
    axios
      .get(url)
      .then((response) => dispatch(getUserDetailSuccess(response)))
      .catch((error) => console.log(error));
  };
}

function getUserDetailSuccess(response) {
  return {
    type: GET_USER_DETAIL_SUCCESS,
    userDetail: response.data.user,
  };
}

import axios from "axios";
import { apiUrls } from "../utils/apiUrls";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILED,
} from "./actionType";

// Login Actions
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

function loginFailed(response) {
  return {
    type: LOGIN_FAILED,
    error: response.error,
  };
}

// Logout Actions
export function logout() {
  return (dispatch) => {
    const url = apiUrls.logout();
    axios
      .get(url)
      .then(() => dispatch(logoutSuccess()))
      .catch((error) => dispatch(logoutFailed(error.response.data)));
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

function logoutFailed(response) {
  return {
    type: LOGOUT_FAILED,
    error: response.error,
  };
}

// Authenticating - Getting User Detail
export function getUserDetail() {
  return (dispatch) => {
    const url = apiUrls.getUser();
    axios
      .get(url)
      .then((response) => dispatch(getUserDetailSuccess(response)))
      .catch((error) => dispatch(getUserDetailFailed(error.response.data)));
  };
}

function getUserDetailSuccess(response) {
  return {
    type: GET_USER_DETAIL_SUCCESS,
    userDetail: response.data.user,
  };
}

function getUserDetailFailed(response) {
  return {
    type: GET_USER_DETAIL_FAILED,
    error: response.error,
  };
}

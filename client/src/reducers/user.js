import {
  GET_USER_DETAIL_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../actions/actionType";

const initialUserState = { userDetail: {}, isLoggedIn: false, error: null };
export default function user(state = initialUserState, action) {
  switch (action.type) {
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: null,
        userDetail: { ...action.userDetail },
      };
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: null,
        userDetail: { ...action.userDetail },
      };
    default:
      return state;
  }
  return state;
}

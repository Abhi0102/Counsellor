import {
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
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
    case LOGOUT_SUCCESS:
      return {
        ...initialUserState,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: null,
        userDetail: { ...action.userDetail },
      };
    case GET_USER_DETAIL_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        // error: action.error,
      };
    default:
      return state;
  }
}

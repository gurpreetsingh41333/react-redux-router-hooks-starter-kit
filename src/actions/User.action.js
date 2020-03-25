import { API_URI, END_POINTS } from "../config/APIURI";
import ApiCall from "../middleware/ApiCall";
import { TYPES } from "./types";

const setUserList = (type, payload) => ({ type, payload });

// fetch the user list with pagination
export const getUserList = ({ pageNumber, pageSize }) => async dispatch => {
  let config = {
    url: API_URI.baseUrl + END_POINTS.GET_USER_LIST.replace('{PageNumber}', pageNumber).replace('{PageSize}', pageSize),
    header: {}
  };
  try {
    const userListResponse = await ApiCall.getCall(config);
    if (
      userListResponse &&
      userListResponse.data &&
      userListResponse.status === 200
    ) {
      await dispatch(setUserList(TYPES.USER_LIST, userListResponse.data));
      return userListResponse.data;
    } else {
      await dispatch(setUserList(TYPES.USER_LIST, {}));
      return {};
    }
  } catch (err) {
    return Promise.reject({ ...err });
  }
};

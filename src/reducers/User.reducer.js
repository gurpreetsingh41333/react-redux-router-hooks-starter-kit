import { TYPES } from "../actions/types";

const initialState = {
  userList: {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.USER_LIST:
      return {
        ...state,
        userList: action.payload
      };
    default:
      return state;
  }
}

import { TYPES } from "../actions/types";

const initialState = {
  menuList: []
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.MENU_LIST:
      return {
        ...state,
        menuList: action.payload
      };
    default:
      return state;
  }
}

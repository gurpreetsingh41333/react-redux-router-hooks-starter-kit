import { combineReducers } from 'redux';

import { menuReducer } from './Menu.reducer';

export default combineReducers({
  menu: menuReducer
});

import { combineReducers } from 'redux';
import TempReducer from './tempReducer';
import authReducer from './authReducer';
import selectedReducer from "./selectedReducer";

export default combineReducers({
  temp: TempReducer,
  auth: authReducer,
  selected: selectedReducer,
});

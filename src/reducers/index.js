import { combineReducers } from 'redux';

import { authentication } from '../pages/Login/reducer';
import { registration } from '../pages/Register/reducer';
import { users } from '../pages/Users/reducer';
import { products } from '../pages/Home/reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  products,
  alert
});

export default rootReducer;
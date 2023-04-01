import { combineReducers } from 'redux';
import { apiSlice } from './features/Authentication/authenticationSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;

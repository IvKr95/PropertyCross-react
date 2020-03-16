import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initialState = {
  currentPage: 'propSearch',
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;

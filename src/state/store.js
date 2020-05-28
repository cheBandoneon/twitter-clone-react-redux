import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from '../reducers';

const initialState = { statePosts: {} , stateUsers: { users: { current_user: {} , users: [] } }};
const middleware = [thunk];
const store = createStore(
    combineReducers , 
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) 
);

export default store;
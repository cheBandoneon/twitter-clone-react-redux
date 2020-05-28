import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import hashtagsReducer from './hashtagsReducer';

export default combineReducers({
  statePosts: postsReducer,
  stateUsers: usersReducer,
  stateHashtags: hashtagsReducer
});
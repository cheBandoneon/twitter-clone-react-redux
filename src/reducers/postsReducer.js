import { GET_FRONT_PAGE_TWEETS , ADD_NEW_TWEET } from '../utility/constants';

const postsReducer = (state={} , action) => {
    switch(action.type) {
        case GET_FRONT_PAGE_TWEETS:
        return {...state, posts: action.payload }

        case ADD_NEW_TWEET:
        return {...state, posts: action.payload.posts }

        default:
        return state;
    }
}

export default postsReducer;
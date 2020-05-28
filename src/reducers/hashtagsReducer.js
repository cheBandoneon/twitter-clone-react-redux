import { GET_HASHTAGS , ADD_NEW_HASHTAG, UPDATE_HASHTAG, SEARCH_HASHTAG } from '../utility/constants';

const hashtagsReducer = (state={} , action) => {
    switch(action.type) {
        case GET_HASHTAGS:
            return {...state, hashtags: action.payload }

        case ADD_NEW_HASHTAG:
            return {...state, hashtags: action.payload }

        case UPDATE_HASHTAG:
            return {...state}

        case SEARCH_HASHTAG:
            console.log('reducer');
            console.log(action.payload);
            return {...state, searchedHashtag: action.payload }

        default:
            return state;
    }
}

export default hashtagsReducer;
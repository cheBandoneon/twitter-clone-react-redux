import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useEffect} from 'react';
import {searchHashtag} from '../../actions/hashtagActions';

export const HashtagTweetsContainer = (props) => {
    const hashtag = props.hashtag;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchHashtag(dispatch, hashtag))
      }, [dispatch,hashtag]);   
    
    const searchedHashtag = useSelector(state => state.stateHashtags.searchedHashtag);

    return (
       //Return posts assosiated with hashtag name
       <div>{searchedHashtag ? searchedHashtag.title : ''}</div>
    );
}
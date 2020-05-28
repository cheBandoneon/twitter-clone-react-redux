import { SEARCH_HASHTAG , GET_HASHTAGS, ADD_NEW_HASHTAG } from '../utility/constants';

export const  getHashtags = () => async dispatch => { 

    try {
      let hashtags = await (await fetch( 'http://localhost:8000/api/v1/hashtags/' )).json();
    
      return dispatch({
        type: GET_HASHTAGS,
        payload: await hashtags
      });
    }
  
    catch (err){
      console.error(err);
    }
}

export const addHashtag = ( newHashtags ) => async (dispatch , getState ) => { 

  const { hashtags } = getState().stateHashtags;
  
  const requestData = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newHashtags)
  }

  try {
    const response = await fetch( 'http://localhost:8000/api/v1/hashtags/' , requestData );
    const newHashtags = (await response.json());
    
    if( Array.isArray(newHashtags ) )
      newHashtags.forEach( hashtag => hashtags.unshift(hashtag));
    else 
      hashtags.unshift(newHashtags);
    
    return dispatch({
      type: ADD_NEW_HASHTAG,
      payload: await hashtags
    });
  }

  catch(err) {
    console.log(err);
  }
}

//TODO: Convert this to Redux
export const updateHashtags = ( latestTweetID, hashtags ) => async dispatch => {
  for (let i=0; i<hashtags.length; i++) {
    const requestBody = { tweet_id: latestTweetID, hashtag_name: hashtags[i] };
    const requestData = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }

    try {
        console.log(await (await fetch( 'http://localhost:8000/api/v1/hashtags/' , requestData )).json());
    }
    catch(err) {
        console.log(err);
    }
}
}

export const searchHashtag = ( dispatch, hashtagName ) => async () => { 
  
  try {
    const response = await fetch( `http://localhost:8000/api/v1/hashtag/?name=${hashtagName}`);
    
    
    if( response && response.status === 200 ) {
      const foundHashtag = await response.json();
      return dispatch({
        type: SEARCH_HASHTAG,
        payload: await foundHashtag
      });
    }
  }

  catch(err) {
    console.log(err);
  }
}
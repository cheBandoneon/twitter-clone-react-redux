import { GET_FRONT_PAGE_TWEETS , ADD_NEW_TWEET } from '../utility/constants';


  
export const  getFrontPageTweets = () => async (dispatch , getState) => { 

  try {
    let tweets = await (await fetch( 'http://localhost:8000/api/v1/tweets/' )).json();
    const { current_user }  = await getState().stateUsers.users;
    
    tweets = await tweets.filter( tweet => ( current_user._id === tweet._author_id || current_user.follows.includes( tweet._author_id ) ) ? tweet : '');
  
    return dispatch({
      type: GET_FRONT_PAGE_TWEETS,
      payload: await tweets
    });
  }

  catch (err){
    console.error(err);
  }
}

export const addTweet = tweetContent => async (dispatch , getState ) => { 
  const { current_user }  = getState().stateUsers.users;
  const { posts } = getState().statePosts;
  const newTweet = {
    tweet_body : tweetContent,
    _author_id : current_user._id,
  };

  const requestData = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTweet)
  }

  try {
    const response = await fetch( 'http://localhost:8000/api/v1/tweets/' , requestData );
    const latestPost = await response.json();
    posts.unshift(await latestPost);

    return dispatch({
      type: ADD_NEW_TWEET,
      payload: { posts: await posts, latestPost: await latestPost }
    });
  }

  catch(err) {
    console.log(err);
  }
}
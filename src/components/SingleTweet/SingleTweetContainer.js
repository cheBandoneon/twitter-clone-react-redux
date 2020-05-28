import {SingleTweet} from './SingleTweet';

export const SingleTweetContainer = (tweet , users) => {
    
    const tweetAuthorID = tweet._author_id;
    const user = users.users.filter( user => user._id === tweetAuthorID ? user : '')[0];

    return (
        SingleTweet(tweet , user)
    )
}
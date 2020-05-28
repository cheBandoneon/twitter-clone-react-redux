import React from 'react';
import SingleTweet from '../SingleTweet';

const HomeFeed = (items, users) => {
    return (
        items.posts && users.current_user._id
        ? 
        <div className="main-tweet-feed">
        {  items.posts.map( item =>  SingleTweet(item , users) ) }
        </div>
        : 
        'LoadingTEST'    
    );
}

export default HomeFeed;
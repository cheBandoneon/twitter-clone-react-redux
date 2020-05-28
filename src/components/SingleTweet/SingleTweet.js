import React from 'react';
import './singleTweet.scss';
import { timeSince } from '../../utility/timeSince';
import ReactHtmlParser from 'react-html-parser'; 

export const SingleTweet = (tweet , user) => {
    const tweetAuthorImageStyle = {
        backgroundImage : `url( ${user.avatar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center' 
    }

    return (
        <div className = "single-tweet" key={tweet._id}>
            <div className = "single-tweet__avatar" style = { tweetAuthorImageStyle } ></div>
            <div className = "single-tweet__body">
                <div className = "single-tweet__meta" >
                    <span className = "single-tweet__author-name">{user.first_name} {user.last_name}</span>
                    <span className = "single-tweet__author-mention-name">@{user.username}</span>
                    <span className = "single-tweet__date">{timeSince(new Date(tweet.date))} ago</span>
                </div>
                <p className = "single-tweet__content">{ReactHtmlParser (tweet.tweet_body)}</p>
            </div>
        </div>
    )
}
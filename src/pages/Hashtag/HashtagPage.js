import React from 'react';
import PageHeader from '../../components/PageHeader';
import HashtagTweets from '../../components/HashtagTweets';
import {useParams} from "react-router-dom";

export const HashtagPage = () => {
    const hashtag = useParams().id;
    return (

        <div className = "main-content">
            <PageHeader pageTitle = {`Tweets Containing #${hashtag}`}></PageHeader>
            <HashtagTweets hashtag = {hashtag}></HashtagTweets>
        </div>
    )
}
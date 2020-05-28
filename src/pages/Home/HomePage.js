import React from 'react';
import TweetForm from '../../components/TweetForm';
import HomeFeed from '../../components/HomeFeed';
import PageHeader from '../../components/PageHeader';

export const HomePage = () => {

    return (

        <div className = "main-content">
            <PageHeader pageTitle = 'Home'></PageHeader>
            <TweetForm></TweetForm>
            <HomeFeed></HomeFeed> 
        </div>
    )
}
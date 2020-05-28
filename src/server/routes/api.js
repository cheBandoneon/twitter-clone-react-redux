const catchExceptions = require('../utility/catchExceptions');

const express = require('express');
const router  = express.Router();
const Tweet   = require('../models/tweet');
const User   = require('../models/user');
const Hashtag   = require('../models/hashtag');

//get the latest tweets from db
router.get('/tweets',
    catchExceptions(async (req, res) => { 
        const tweets = await Tweet.find({}).sort({ date: -1 }).limit(10);
        res.send(tweets);
    }
));

//Insert new tweet to db
router.post('/tweets', 
    catchExceptions(async (req, res) => {
        const newTweet = await Tweet.create(req.body);
        res.send(newTweet);
    }
));

//get the users from db
router.get('/users', 
    catchExceptions(async (req, res) => {
        const users = await User.find({});
        res.send(users);
    }
));

//Add new user to db
router.post('/users',
    catchExceptions(async (req, res) => {
        const newUser = await User.create(req.body);
        res.send(newUser);
    }
));

//Get the hashtags from db
router.get('/hashtags', 
    catchExceptions(async (req, res) => {
        const hashtags = await Hashtag.find({});
        res.send(hashtags);
    }
));

//Add new hashtags to db
router.post('/hashtags', 
    catchExceptions(async (req, res) => {
        //Add array of new hashtags to the db
        const newHashtags = await Hashtag.insertMany(req.body);
        res.send(newHashtags);   
    }
));

//Update Hashtag
router.put('/hashtags', 
    catchExceptions(async (req, res) => {
        const updateHashtag = await Hashtag.findOne({title_clean: req.body.hashtag_name});
        try {
            updateHashtag.tweets.push(req.body.tweet_id);
            updateHashtag.number_of_tweets++;
            updateHashtag.save();
            res.send(updateHashtag);
        }
        catch(err) {
            res.send(err);
        }
    }
));

//Search Hashtag
router.get('/hashtag', 
    catchExceptions(async (req, res) => {
        let hashtagName = req.query.name;
        const foundHashtag = await Hashtag.findOne({title_clean: hashtagName});
        res.send(foundHashtag);
    }
));


module.exports = router;
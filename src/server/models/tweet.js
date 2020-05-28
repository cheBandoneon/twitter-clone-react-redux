const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TweetSchema = new Schema({
    tweet_body  : String,
    _author_id  : Schema.Types.ObjectId,
    date        : { type: Date, default: Date.now }
});

const Tweet = mongoose.model('tweet', TweetSchema);
module.exports = Tweet;
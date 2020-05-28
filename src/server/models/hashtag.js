const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const HashTagSchema = new Schema({
    title  : String,
    title_clean: String,
    number_of_tweets: {
        type: Number,
        default: 1
    },
    tweets : []
});

const Hashtag = mongoose.model('hashtag', HashTagSchema);
module.exports = Hashtag;
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
    first_name  : String,
    last_name   : String,
    username    : String,
    avatar      : '',
    follows     : []
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
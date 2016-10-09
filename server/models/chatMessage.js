var mongoose = require('mongoose');

var chatMessageSchema = mongoose.Schema({
    message:{
        id: String,
        username: String,
        body: String,
        userAvatar: String,
        date: Date
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
const mongoose = require('mongoose');
module.exports = mongoose.model('conversations' , {
    members : [{type:mongoose.Schema.Types.ObjectId , ref:"users"}],
    conversationTime : {type:Date , default:Date.now}
});
const mongoose = require('mongoose');
module.exports = mongoose.model('conversations' , {
    user1:{type:mongoose.Schema.Types.ObjectId , ref:'users' , required:true},
    user2:{type:mongoose.Schema.Types.ObjectId , ref:'users' , required:true},
    conversationTime : {type:Date , default:Date.now}
});
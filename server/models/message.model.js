const mongoose = require('mongoose');
module.exports = mongoose.model('messages' , {
    senderId:{type:mongoose.Schema.Types.ObjectId , ref:'users' , required:true},
    receiverId:{type:mongoose.Schema.Types.ObjectId , ref:'users' , required:true},
    text:{type:String , required:true},
    conversationId:{type:mongoose.Schema.Types.ObjectId , ref:'conversations' , required:true},
    creationDate:{type:Date , default: Date.now}
});
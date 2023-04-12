const mongoose = require('mongoose');
const users = require('./user.model');
module.exports = mongoose.model('properties' , {
    title: {type: String , required: true},
    description : {type: String , required: true},
    price : {type:String , required: true},
    complexType : {type:String , required: true},
    bedrooms:{type: Number , required: true},
    bathrooms:{type:Number , required:true},
    listingType:{type:String , required:true},
    imageurls:[String],
    location:{type:String , required:true},
    creationDate:{type:Date , default: Date.now},
    agent:{
        agent_id:{type:mongoose.Schema.Types.ObjectId , ref:'users'},
        name:{type:String , required:true},
        email:{type:String , required:true},
        profilePicture:{type:String , required:true},
        phoneNumber:{type:String , required:true},
    }
});
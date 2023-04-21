const mongoose = require('mongoose');
module.exports = mongoose.model('properties' , {
    title: {type: String , required: true},
    description : {type: String , required: true},
    price : {type:String , required: true},
    complexType : {type:String , required: true},
    bedrooms:{type: Number , required: true},
    bathrooms:{type:Number , required:true},
    listingType:{type:String , required:true},
    imageurls:[String],
    surface:{type:Number , required:true},
    location:{type:String , required:true},
    creationDate:{type:Date , default: Date.now},
    userId:{type:mongoose.Schema.Types.ObjectId , ref:'users' , required:true}
});
const mongoose = require('mongoose');

module.exports = mongoose.model('properties' , {
    title: {type: String , required: true},
    description : {type: String , required: true},
    price : {type:String , required: true},
    bedrooms:{type: Number , required: true},
    bathrooms:{type:Number , required:true},
    listingType:{type:String , required:true},
    imageurls:{type:Array , required:true},
    location:{type:String , required:true},
    creationDate:{type:Dates},
    owner:{type:mongoose.Schema.Types.ObjectId , ref:'users'}
})
const mongoose = require('mongoose');
module.exports = mongoose.model('favorites' , {
    user_id:{type:mongoose.Schema.Types.ObjectId , ref:'users'},
    property_id:{type:mongoose.Schema.Types.ObjectId , ref:'properties'},
    created_at:{type:Date , default:Date.now}
})
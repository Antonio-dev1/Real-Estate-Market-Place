const mongoose = require('mongoose');
module.exports = mongoose.model('favorites' , {
    user_id:{type:mongoose.Schema.Types.ObjectId , ref:'users' , required:true , ondelete:'CASCADE'},
    property_id:{type:mongoose.Schema.Types.ObjectId , ref:'properties' , required:true , ondelete:'CASCADE'},
    created_at:{type:Date , default:Date.now}
})
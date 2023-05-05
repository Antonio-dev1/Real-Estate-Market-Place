const mongoose = require('mongoose');
module.exports = mongoose.model('favorites' , {
    user_id:{type:mongoose.Schema.Types.ObjectId , ref:'users' , ondelete:'CASCADE', required:true , },
    property_id:{type:mongoose.Schema.Types.ObjectId , ref:'properties' , ondelete:'CASCADE', required:true , },
    created_at:{type:Date , default:Date.now}
})
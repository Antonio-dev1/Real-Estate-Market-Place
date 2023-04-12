const bcrypt = require('bcrypt');
exports.generateCrudMethods = Model => {
    return {
        getAll: () => Model.find(),
        getByID: () => Model.findById(),
        create: record => Model.create(record),
        update: (id,record) => Model.findByIdAndUpdate(id,record , {new:true}),
        delete: id => Model.findByIdAndDelete(id),
        getUserbyEmail: email => Model.findOne({email:email})
    }
}
exports.generateCrudMethods = Model => {
    return {
        getAll: () => Model.find().populate('userId'),
        getByID: (id) => Model.findById(id).populate('userId'),
        create: record => Model.create(record),
        update: (id , record) => Model.findByIdAndUpdate(id , record , {new:true}),
        delete: id =>  Model.findOneAndDelete(id),
        getByUserId: userId => Model.find({userId}),
        filterProperties: (filter) => Model.find(filter).populate('userId')

    }
}
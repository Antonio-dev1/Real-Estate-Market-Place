exports.generateCrudMethods = Model => {
    return {
        getAll: () => Model.find().populate('userId'),
        getbyID: (id) => Model.findbyId(id).populate('userId'),
        create: record => Model.create(record),
        update: (id , record) => Model.findbyIdAndUpdate(id , record , {new:true}),
        delete: id =>  Model.findOneAndDelete(id)

    }
}
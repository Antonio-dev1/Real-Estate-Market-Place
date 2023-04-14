exports.generateCrudMethods = Model => {
    return {
        getAll: () => Model.find(),
        getbyID: (id) => Model.findbyId(id),
        create: record => Model.create(record),
        update: (id , record) => Model.findbyIdAndUpdate(id , record , {new:true}),
        delete: id =>  Model.findOneAndDelete(id)

    }
}
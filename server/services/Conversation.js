exports.generateCrudMethods = Model => {
    return {
    getAll: () => Model.find(),
    getById: (id) => Model.findById(id),
    create: record => Model.create(record),
    delete: (id) => Model.findByIdAndDelete(id),
    getUserConversation: (id) => Model.find({$or:[{sender:id},{receiver:id}]}).populate('sender').populate('receiver')
    }


}
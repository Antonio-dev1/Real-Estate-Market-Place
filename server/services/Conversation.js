exports.generateCrudMethods = Model => {
    return {
    getAll: () => Model.find(),
    getById: (id) => Model.findById(id),
    create: record => Model.create(record),
    delete: (id) => Model.findByIdAndDelete(id),
    getUserConversation: (id) => Model.find({members:id}).populate('members' , 'fullName profilePicture '),
    getSpecificConversation: (id1 , id2) => Model.find({members:{$all:[id1 , id2]}}).populate('members' , 'fullName profilePicture ')
    }


}
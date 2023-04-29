exports.generateCrudMethods = Model =>{
    return{
        getAll: () => Model.find().populate('sender').populate('receiver'),
        getByID: (id) => Model.findById(id).populate('sender').populate('receiver'),
        create: record =>Model.create(record),
        delete: (id) => Model.findByIdAndDelete(id),
        getUserMessages: (id) => Model.find({$or:[{sender:id},{receiver:id}]}).populate('sender').populate('receiver'),
        getConversation: (id1 , id2) => Model.find({$or:[{sender:id1 , receiver:id2},{sender:id2 , receiver:id1}]}).populate('sender').populate('receiver')
    }
}
exports.generateCrudMethods = Model =>{
    return{
        getAll: () => Model.find().populate('senderId').populate('receiverId'),
        getByID: (id) => Model.findById(id).populate('senderId').populate('receiverId'),
        create: record =>Model.create(record),
        delete: (id) => Model.findByIdAndDelete(id),
        getUserMessages: (id) => Model.find({$or:[{sender:id},{receiver:id}]}).populate('senderId').populate('receiverId'),
        getConversation: (id1 , id2) => Model.find({$or:[{sender:id1 , receiver:id2},{sender:id2 , receiver:id1}]}),
        getByConvId: (id) => Model.find({conversationId:id}),
        getMessagesByConvId: (id) => Model.find({conversationId:id}),
    }
}
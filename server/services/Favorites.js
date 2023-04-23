exports.generateCrudMethods = Model => {
    return {
        getAll: () => Model.find(),
        getById: (id) => Model.findById(id),
        create: record => Model.create(record),
        delete : id => Model.findByIdAndDelete(id),
        update: (id , record) => Model.findByIdAndUpdate(id , record , {new:true}),
        getUserFavorites: (userID) => Model.find({user_id:userID}).populate('property_id'),
        getFavorite: (userID , propertyID) => Model.findOne({user_id:userID , property_id:propertyID}).exec()
    }
}
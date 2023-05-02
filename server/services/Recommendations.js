exports.generateRecommenderMethods = Model => {
    return {
        getRecommendation: (propertyList) => Model.find({ _id: { $in: propertyList}})
    }
}
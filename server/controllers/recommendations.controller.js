const express = require('express')
const router  = express.Router();
const request = require('request');
const PropertyModel = require('../models/property.model');
const FavoritesModel = require('../models/favorites.model');
const {generateCrudMethods} = require('../services/Favorites');
const favoritesCrud = generateCrudMethods(FavoritesModel);
const {generateRecommenderMethods} = require('../services/Recommendations');
const recommenderCrud = generateRecommenderMethods(PropertyModel);
const {validateDbId , raiseRecord404Error , errorHandler} = require('../middleware/routesErrorHandling');
const {authenticateJWT} = require('../middleware/jwtAuthentication');


router.get('/:id' , authenticateJWT , (req , res , next) => {
    const id = req.params.id;
    const favoritesList = [];
    favoritesCrud.getUserFavorites(id).then((favorites) => {
        if(favorites) {
            const url = "http://127.0.0.1:8000/getRecommendation";
            fetch(url , {
              method : 'POST',
              port: 8000,
              headers: {
                "Content-Type": "application/json",
                
              },
              body : JSON.stringify(favorites)
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data['propertyId']);
                    recommenderCrud.getRecommendation((data['propertyId'])).then((recommendations) => {
                        if(recommendations){
                            res.json(recommendations);
                        }
                        else{
                            res.json({message : 'No recommendations found'});
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                
            });
          
        } 
        else{
            raiseRecord404Error(req , res);
        }


        
    }).catch((err) => {
        console.log(err)
    });
    // console.log(favoritesList);
    //     if(favoritesList.length > 0){
    //         const url = "http://localhost:8000/getRecommendation";
    //       fetch(url , {
    //         method : 'GET',
    //         body : favoritesList[0]
    //       }).then((response) => {
    //         return response.json();
    //       });
    //     }

    //     else{
    //         res.json({message : 'No favorites found'});
    //     }

});

module.exports = router;
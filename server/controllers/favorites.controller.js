const express = require('express');
const router = express.Router();
const Favorites = require('../models/favorites.model');
const {generateCrudMethods} = require('../services/Favorites');
const favoritesCrud = generateCrudMethods(Favorites);
const {validateDbId , raiseRecord404Error , errorHandler} = require('../middleware/routesErrorHandling');
const {authenticateJWT} = require('../middleware/jwtAuthentication');
require('dotenv').config();


router.get('/' , authenticateJWT , (req , res , next) => {
    favoritesCrud.getAll().
    then(favorites => {
        res.json(favorites)
    })
    .catch(err => {
        res.json(err)
        console.log(err , 'error')
    })
});

router.get('/:id' , authenticateJWT , validateDbId , (req , res, next) => {
    const id = req.params.id;
    favoritesCrud.getById(id).
    then(favorite => {
        if(favorite){
            res.json(favorite)
        } 
        else{
            raiseRecord404Error(req , res);
        }
    })
});

router.post('/' , authenticateJWT , (req , res , next) => {
    const favorite = req.body;
    favoritesCrud.create(favorite).
    then(favorite => {
        console.log(favorite)
        res.json(favorite)
    }).catch(err => {
        res.json(err)
        console.log(err , 'error');
    })

});

router.delete('/:id' , authenticateJWT , validateDbId , (req , res , next) => {
    const id = req.params.id;
    favoritesCrud.delete(id).
    then(favorite => {
        if(favorite){
        res.json(favorite)
        }
        else{
            raiseRecord404Error(req , res);
        }
    }).catch(err => {
        res.json(err)
        console.log(err  , 'error')
    })
    
});

router.put('/:id' , authenticateJWT , validateDbId , (req , res , next) => {
    const id =  req.params.id;
    const favorite = req.body;
    favoritesCrud.update(id , favorite).
    then(favorite => {
        res.json(favorite)
    }).catch(err => {
        res.json(err)
        console.log(err , 'error')
    })
});


router.get('/user/:id' , authenticateJWT , validateDbId , (req , res , next) => {
    const userId = req.params.id;
    favoritesCrud.getUserFavorites(userId).then(favorites => {
        res.json({
            message: 'Favorites retrieved successfully',
            favorites: favorites
        })
        }).catch(err => {
            res.json(err)
            console.log(err , 'error')
    })
});

router.post('/favoritesearch' , authenticateJWT , (req , res , next) => {
    const search = req.body;
    console.log(search)
    favoritesCrud.getFavorite(search.user_id , search.property_id).
    then(favorite => {
        if(favorite){
            console.log(favorite)
            res.json({
                message: 'Favorited',
                favorite: favorite
            })
           
        }  else {
             console.log('Did not find anything')
            res.json({
                message: 'Not Favorited',
            })
        }
    }).catch(err => {
        res.json(err)
        console.log(err , 'error')
    })
});




module.exports = router;
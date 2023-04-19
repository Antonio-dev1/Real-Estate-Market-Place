const express = require('express');
const router = express.Router();
const Property = require('../models/property.model');
const path = require('path');
const {generateCrudMethods} = require('../services/Property');
const propertyCRUD = generateCrudMethods(Property);
const {validateDbId , raiseRecord404Error,errorHandler} = require('../middleware/routesErrorHandling');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {authenticateJWT} = require('../middleware/jwtAuthentication');
const upload = require('../middleware/uploadImages');

//Unprotected routes are the get by id and the get since the user has the right to open home page at the beginning part of the features

router.get('/' , (req , res)=>{
    propertyCRUD.getAll().
    then(properties => res.json(properties)).
    catch(err => next(err));

});

router.get('/:id' ,  validateDbId , (req , res)=>{
    const id = req.params.id;
    propertyCRUD.getByID(id).
    then(property => {
        if(property){
        res.json(property)
        }
        else{
            raiseRecord404Error(req , res);
        }
    })
    .catch(err => {
        console.log(err, 'error')
    });
    
});

router.post('/' , authenticateJWT, (req , res ,next)=> {
    const property = req.body;
    propertyCRUD.create(property).
    then(property => res.json(property)).
    catch(err => next(err));
})


router.put('/:id' , authenticateJWT , validateDbId , (req , res , next)=>{
    const id = req.params.id;
    const property = rq.body;
    propertyCRUD.update(id , property).
    then(property => {
        if(property){
            res.json(property)
        } else{
            raiseRecord404Error(req , res);
        }
    })
    .catch(err => {
        console.log(err, 'error')   
    });
});


router.post('/upload' , authenticateJWT , upload.array('propertyPhotos' , 20) , (req , res , next)=>{
    if(req.file){
        res.json(req.file)
    }
});

module.exports = router;
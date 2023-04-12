const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const {generateCrudMethods} = require('../services/User');
const userCRUD = generateCrudMethods(User);
const {validateDbId , raiseRecord404Error,errorHandler} = require('../middleware/routesErrorHandling');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {authenticateJWT} = require('../middleware/jwtAuthentication');
const {hashPassword , verifyPassword} = require('../functions/userFunctions.js');

router.get('/' , authenticateJWT , (req , res)=>{
    userCRUD.getAll().
    then(users => res.json(users)).
    catch(err => next(err));
}); 

router.get('/:id' , authenticateJWT , validateDbId , (req , res)=>{
    const id = req.params.id;
    userCRUD.getByID(id).
    then(user => {
        if(user){
        res.json(user)
        }
        else{
            raiseRecord404Error(req , res);
        }
    })
    .catch(err => {
        console.log(err, 'error')
    });
    
});

router.post('/' , async (req , res)=> {
    const user = req.body;
    user.password = await hashPassword(user.password);

    await userCRUD.create(user).
    then(user => res.json(user)).
    catch(err => next(err));
});

router.put('/:id' , authenticateJWT , validateDbId , (req , res , next)=>{
    const id = req.params.id;
    const user = req.body;
    userCRUD.update(id , user).
    then(user => {
        if(user){
        res.json(user)
        }
        else{
            raiseRecord404Error(req , res);
        }
    })
    .catch(err => next(err));
});

router.delete('/:id' , authenticateJWT , validateDbId , (req , res , next)=>{
    const id = req.params.id;
    userCRUD.delete(id).
    then(data => {
        if(data){
            res.json(data)
        }
        
            else {
                raiseRecord404Error(req , res);
            }
        
    })
    .catch(err => next(err));
});

router.post('/login' , async (req , res  , next)=>{
    const email = req.body.email;   
    const password = req.body.password;
    const user = await userCRUD.getUserbyEmail(email);
    if(!user){
        return res.status(404).json({error:'User not found'});
    }

    const isPasswordValid = await verifyPassword(password , user.password);

    if(!isPasswordValid){
        return res.status(401).json({error:'Invalid password'});
    }
    else{
        var token = jwt.sign({id:user._id} , process.env.JWT_SECRET , {expiresIn: 86400});
        user.token = token
        res.status(200).json({token:token});
    }
});

module.exports = router;


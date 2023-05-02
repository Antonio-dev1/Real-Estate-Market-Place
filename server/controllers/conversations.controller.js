const express = require('express');
const router = express.Router();
const Conversations = require('../models/conversations.model');
const {generateCrudMethods} = require('../services/Conversation');
const conversationCRUD = generateCrudMethods(Conversations);
const {validateDbId , raiseRecord404Error,errorHandler} = require('../middleware/routesErrorHandling');
const {authenticateJWT} = require('../middleware/jwtAuthentication');

router.get('/' ,  (req , res) => {
    conversationCRUD.getAll().
    then(conversations => {
        res.json(conversations);
    }).catch(err => {
        next(err);
    })
});

router.get('/:id' , authenticateJWT , validateDbId , (req , res)=>{
    const id = req.params.id
    conversationCRUD.getById(id).
    then(conversation => {
        if(conversation){
            res.json(conversation)
        }
        else{
            raiseRecord404Error(req , res);
        }
    })
    .catch(err => {
        console.log(err, 'error');
        next(err);
    })
});

router.post('/' , authenticateJWT , (req , res , next)=> {
    const conversation = req.body;
    conversationCRUD.create(conversation).
    then(conversation => {res.json(conversation)}
    ).catch(err => 
        {next(err)});
});


router.delete('/:id' , authenticateJWT , validateDbId , (req , res , next)=>{
    const id = req.params.id;
    conversationCRUD.delete(id).
    then(conversation => {
        if(conversation){
            res.json(conversation)
        }
        else{
            raiseRecord404Error(req , res);
        }
    }).catch(err => {
        console.log(err, 'error');
        next(err);
    })
});

router.get('/user/:id' , authenticateJWT , validateDbId , (req , res , next)=>{
    const id = req.params.id;
    conversationCRUD.getUserConversation(id).
    then(conversation => {
        res.json(conversation)
    }).catch(err => {
        console.log(err, 'error');
        next(err);
    })
});

router.get('/user/:id/:id2',authenticateJWT,validateDbId,(req,res,next)=>{
    const id = req.params.id;
    const id2 = req.params.id2;
    conversationCRUD.getSpecificConversation(id,id2).
    then(conversation=>{
        res.json(conversation)
    }).catch(err=>{
        console.log(err,'error');
        next(err);
    })
});


module.exports = router;
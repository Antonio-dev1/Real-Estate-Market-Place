const express = require('express');
const router = express.Router();
const messageModel = require('../models/message.model');
const {generateCrudMethods} = require('../services/messages');
const messageCrud = generateCrudMethods(messageModel);
const {authenticateJWT} = require('../middleware/jwtAuthentication');
const {validateDbId , raiseRecord404Error,errorHandler} = require('../middleware/routesErrorHandling');


router.get('/' , authenticateJWT , (req , res) => {
    messageCrud.getAll().
    then(messages => {
        res.json(messages);
    }).catch(err => {
        res.json(err);
    });
});

router.get('/:id' , authenticateJWT , validateDbId , (req , res , next) => {
    const id =  req.params.id
    messageCrud.getByID(id).
    then(message => {
        if(message){
            res.json(message);
        }
        else{
            raiseRecord404Error(req , res);
        }
    }).catch(err => {
        next(err);
    })
})

router.post('/' , authenticateJWT , (req , res, next) => {
    const message = req.body;
    messageCrud.create(message).
    then(message => {
        res.json(message);
    }).
    catch(err => {
        next(err);
    })
});

router.get('/user/:id' , authenticateJWT , validateDbId , (req , res , next) => {
    const id = req.params.id;
    messageCrud.getUserMessgaes(id).
    then(messages => {
        if(messages){
            res.json(messages);

        }
        else{
            raiseRecord404Error(req , res);
        }
    }).catch (err => {
        next(err);
    })
});


router.get('/user/:id/:id2' , authenticateJWT , validateDbId , (req , res , next) => {
    const id = req.params.id;
    const id2 = req.params.id2; 
    messageCrud.getConversation(id , id2).
    then(conversation => {
        if(conversation){
            res.json(conversation);
        }
        else{
            raiseRecord404Error(req , res);
        }

    }).
    catch(err => {
        next(err);
    })

});

router.post('/chat/' , validateDbId , (req , res , next) => {
    const convId = req.body.conversationId;
    messageCrud.getByConvId(convId).then(messages => {
        if(messages){
            res.json(messages);
        }
        else{
            raiseRecord404Error(req , res);
        }
    }).catch(err => {
        next(err);
    });
});



module.exports = router;
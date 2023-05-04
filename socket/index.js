
const io = require('socket.io')(3010 , {
    cors: { origin: 'http://localhost:3000' }
});

let connectedUsers = [];

const addUser = (userId , socketId) => {
    !connectedUsers.some(user => user.userId === userId) && connectedUsers.push({userId , socketId})
}

const getUser = (userId) => {
    return connectedUsers.find(user => user.userId === userId);
};

const removeUser = (socketId) => {
  connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
};


io.on('connection' , (socket) => {
    console.log('A user connected')
    //We need to grab the users and take their id and socket ids to be able to send messages to them
     socket.on("addUser"  , userId => {
         addUser(userId , socket.id);
         io.emit("getUsers" , connectedUsers)
     })

     socket.on("sendMessage" , ({senderId , receiverId , text}) => {
        const user = getUser(receiverId);
        console.log("This is the" , user)
        console.log(text)
        if(user!== undefined){
        io.to(user.socketId).emit("getMessage" , {
            senderId,text,
        });
    } else{
        console.log("user not online sending to db")
    }
     });

     socket.on("disconnect" , () => {
        console.log("A user disconnected");
        removeUser(socket.id);
        io.emit("getUsers" , connectedUsers)
    })
});



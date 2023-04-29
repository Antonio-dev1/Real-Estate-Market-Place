
const io = require('socket.io')(3010 , {
    cors: { origin: 'http://localhost:3000' }
});

let connectedUsers = [];

io.on('connection' , (socket) => {
    console.log('A user connected')
    //We need to grab the users and take their id and socket ids to be able to send messages to them
    // socket.on("addUser"  , userId => {
    //     connectedUsers
    // })
})
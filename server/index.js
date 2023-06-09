const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const connectDb = require('./db.js');
const userRoutes = require('./controllers/user.controller.js');
const propertyRoutes = require('./controllers/property.controller.js');
const favoritesRoutes = require('./controllers/favorites.controller.js');
const messageRoutes = require('./controllers/messages.controller.js');
const conversationRoutes = require('./controllers/conversations.controller.js');
const recommendationRoutes = require('./controllers/recommendations.controller.js');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploadedImages', express.static(path.join(__dirname, 'uploadedImages')));
app.use('/api/users' , userRoutes);
app.use('/api/properties' , propertyRoutes);
app.use('/api/favorites' , favoritesRoutes);
app.use('/api/messages' , messageRoutes);
app.use('/api/conversations' , conversationRoutes);
app.use('/api/recommendations' , recommendationRoutes);
// Connecting to the database
connectDb().then(() => {
    console.log('Database connected')
    app.listen(3001, () => console.log('Server started on port 3001'))
}).catch(err => console.log(err))
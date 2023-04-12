const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const connectDb = require('./db.js');
const userRoutes = require('./controllers/user.controller.js');


app.use('/api/users' , userRoutes);

  
// Connecting to the database
connectDb().then(() => {
    console.log('Database connected')
    app.listen(3001, () => console.log('Server started on port 3001'))
}).catch(err => console.log(err))
const express = require('express');
const cors = require('cors');
const { mongoose } = require('mongoose');
// cloudinary to handle image uploads
const v2 = require( 'cloudinary');
// multer to handle file uploads
const multer = require('multer');
// cloudinary storage engine for multer to handle file uploads
const  { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const app = express();

// cors middleware to allow cross-origin requests
app.use(cors(
    {
        origin: process.env.PORT,
        credentials: true
    }
));
app.use(express.json());    // parse application/json
app.use(express.urlencoded({ extended: true }));    // parse application/x-www-form-urlencoded


app.get('/', (req, res) => {
    res.send('Hello World!');
});



// connect to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(() =>{
    console.log('Connected to the database');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });   
})
.catch((err) =>{
    console.log(err.message)
})
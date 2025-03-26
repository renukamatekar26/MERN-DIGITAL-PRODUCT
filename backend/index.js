const express = require('express');
const cors = require('cors');
const { mongoose } = require('mongoose');
// cloudinary to handle image uploads
const cloudinary = require( 'cloudinary').v2;
// multer to handle file uploads
const multer = require('multer');
// cloudinary storage engine for multer to handle file uploads
const  { CloudinaryStorage } = require('multer-storage-cloudinary');

const productRoute = require('./routes/product.route');
const stripeRoute = require('./routes/stripe.route');
const subscriberRoute = require('./routes/subscriber.route');
const  authRoute = require('./controllers/auth.controller')

require('dotenv').config();

const app = express();

// cors middleware to allow cross-origin requests
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.json());    // parse application/json
app.use(express.urlencoded({ extended: true }));    // parse application/x-www-form-urlencoded


app.use('/product', productRoute);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// cloudinary instance
app.use((req,res,next) =>{
    req.cloudinary = cloudinary;
    next();
})

const storage  = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        allowedFormats: ['jpeg','png','jpg', 'webp'],
    }
});

// multer for file upload
const parser = multer({storage: storage});

// route for uploading file to cloudinary

app.post('/upload-image', parser.single('file'), (req,res) => {
    console.log('upload', req?.file);
    
    if(!req?.file) return res.status(500).json('No file uploaded');
    try{
        if(!req?.file?.path) {
            console.log("req?.file", req?.file);
            
            throw new Error('File uploaded, but no path available')
        }
        res.json({secure_url: req.file.path})
    }
    catch (error){
        debugger
        console.error('Error during file upload', error);
        
        res.status(500).json(error);
    }

})

app.put("/upload-image/:id", parser.single("file"), async (req, res) => {
    try {
        const { id } = req.params;
        let secure_url = req?.file ? req.file.path : req?.body?.file; // ✅ Fix: Assign path directly

        // ✅ Update product without extra response
        const updatedProduct = await Product.findByIdAndUpdate(id, { image: secure_url }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
});

// app.put("/upload-image/:id", parser.single("file"), async (req, res) => {
//     try {
//         const { id } = req.params;
//         // console.log("id", id, req?.body);
        
//         // const { existingImage } = req?.body?.file;
//         console.log("existing", req?.body?.file);
        
//         let secure_url;

//         if(req?.file) {
//             secure_url = res.json(req.file.path)
//         }
//         else{
//             secure_url = res.json(req?.body?.file)
//         }
//         // const imagePath 
//         // = req.file ?  : existingImage; // Keep old image if no new one

//         const updatedProduct = await Product.findByIdAndUpdate(id, { image: secure_url }, { new: true });

//         if (!updatedProduct) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating product", error });
//     }
// });



// use Stripe route 
app.use('/stripe', stripeRoute);
app.use('/subscribe', subscriberRoute);
app.use('/auth', authRoute);
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
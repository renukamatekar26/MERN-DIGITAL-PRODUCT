const express = require('express');
const Product  = require('../models/product.model');
// const Product = require('../models/product.model');


const router = express.Router();

// POST http://localhost:5000/product/
router.post('/', async(req,res) =>{
    const { name, priceInCents,description, image, category } = req.body;
    console.log(req?.body);
    if(!name || !priceInCents || !image || !category) {
        return res.status(400).json('Required fields are missing')
    }
try {
    
    const newProduct = new Product({ name, priceInCents,description, image, category });
    // const product = await Product.create(req?.body);
    console.log(newProduct);
    await newProduct.save();
    return res.status(201).json({ message: 'Product created successfully', newProduct })

} catch (error) {
    res.status(500).json({message: error.message})
}
});

// get product route
router.get('/', async(req,res) => {
    try{
        const product = await Product.find({});
        return res.status(200).json({product});
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

// get product by id
router.get('/:id', async(req,res) => {
    try{
        const { id } = req?.params;
        const product = await Product.findById(id);
        console.log('product:', product)
        return res.status(200).json({product});
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

// delete product 
router.delete('/:id', async(req,res) => {
    try{
        const { id } = req?.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) return res.status(404).json({message:'Product not found'});
        return res.status(200).json({message: 'Product deleted successfully', deletedItem: product});
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

// update product
router.put('/:id', async(req,res) =>{
    try {
        const {id} = req?.params;
        const product =  await Product.findByIdAndUpdate(id, req?.body, {new: true});
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
        return res.status(200).json({message: 'Product Updated successfully'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

 // POST http://localhost:5000/product/createProduct
// router.post('/createProduct', async(req,res) =>{
// });

module.exports = router;
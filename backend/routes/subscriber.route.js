const express = require('express');
const Subscriber = require('../models/subscriber.model')
const router = express.Router();



router.post('/', async(req,res) =>{
    const { email } = req.body;
    console.log(req?.body);
    if(!email) {
        return res.status(400).json('EmailId is missing')
    }
try {
    
    const newSubscriber = new Subscriber({ email });
    // const product = await Product.create(req?.body);
    console.log(newSubscriber);
    await newSubscriber.save();
    return res.status(201).json({ message: 'User subscribed successfully', newSubscriber })

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

module.exports = router;
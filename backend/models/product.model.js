const { mongoose } = require('mongoose');
const { Schema } = mongoose;
// const { Product } = require('./product.model');

const productSchema = new Schema({
    name: {type: String, required: true},
    priceInCents: {type: Number , required: true},
    description: {type: String , required: false},
    image: {type: String, required: true},
    category: {
        type: String, 
        required: true,
        enums: ['course', 'template']
    },
}, 
{ timestamps: true } ,
);

// export const Product = mongoose.model("Product", productSchema);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
const { mongoose } = require('mongoose');

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    priceInCents: {type: Number , required: true},
    image: {type: String, required: true},
    category: {
        type: String, 
        required: true,
        enums: ['course', 'template']
    },
}, 
{ timestamps: true }

)
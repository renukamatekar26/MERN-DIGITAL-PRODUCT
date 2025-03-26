const { mongoose } = require('mongoose');
const { Schema } = mongoose;

const subscriberSchema = mongoose.Schema({
    email: {type: String, required: true},
},
{timestamps: true}
)

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = Subscriber;

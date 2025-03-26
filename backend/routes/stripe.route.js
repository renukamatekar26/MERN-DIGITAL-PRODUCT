const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// create route for checkout session
router.post('/create-checkout-session', async (req, res) => {

    const { line_items } = req?.body;

    const lineItems = line_items.map(product => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product?.name,
                images: [product?.image]
            },
            unit_amount: product?.priceInCents,
        },
        quantity: product?.quantity,
    }));

    const productDetailsSerialized = JSON.stringify(line_items.map(product => ({
        name: product?.name,
        quantity: product?.quantity,
        price: product.priceInCents * 100,

    })));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            metadata: { productDetails: productDetailsSerialized },
            mode: 'payment',
            billing_address_collection: 'required',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });
        res.json({ sessionId: session?.id })
    } catch (error) {
        console.error('failed to create checkout', error?.message);
        res.status(500).json({ message: error?.message })
    }


})

// get status
router.get('/api/stats', async (req, res) => {
    try {
        const balance = await stripe.balance.retrieve();
        console.log("balance obj", JSON.stringify(balance, null, 2));
        const availableBalanceUSD = balance.available.find((bal) => bal.currency === 'usd');
        const pendingBalanceUSD = balance.pending.find((bal) => bal.currency === 'usd');

        const availableBalance = availableBalanceUSD ? availableBalanceUSD.amount / 100 : 0;
        const pendingBalance = pendingBalanceUSD ? pendingBalanceUSD.amount / 100 : 0;

        const charges = await stripe.charges.list({ limit: 100 });
        const totalCharges = charges.data.length;

        res.status(200).json({
            availableBalance,
            pendingBalance,
            totalCharges
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports = router;
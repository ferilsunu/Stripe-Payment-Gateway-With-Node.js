const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)

router
    .post('/', async (req, res) => {

        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.DOMAIN}/success.html`,
            cancel_url: `${process.env.DOMAIN}/cancel.html`,
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Apple Gift Card'
                    },
                    unit_amount: 25000
                },
                quantity: 1
            }],
            mode: 'payment',
            billing_address_collection: 'required'
        }) 

        res.json(session)




    })

module.exports = router
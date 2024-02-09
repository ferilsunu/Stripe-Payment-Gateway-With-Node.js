const express = require('express');
const serverless = require('serverless-http');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

dotenv.config();

const public_path = path.join(__dirname, 'public');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(public_path));

app.engine('handlebars', hbs({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', async (req, res) => {
    try {
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
                    unit_amount:  25000
                },
                quantity:  1
            }],
            mode: 'payment',
            billing_address_collection: 'required'
        });

        res.json(session);
    } catch (error) {
        res.status(500).send('Error creating Stripe session');
    }
});

app.use('/', router);

module.exports.handler = serverless(app);

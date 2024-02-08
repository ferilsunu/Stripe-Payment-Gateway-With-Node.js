const express = require('express');
const serverless = require('serverless-http');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');

dotenv.config();

const PORT = process.env.PORT || 3000;
const public_path = path.join(__dirname, '/public');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(public_path));

const indexRoute = require('../routers/index');
const checkoutRoute = require('../routers/checkout');

app.engine('handlebars', hbs({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars');

app.use('/', indexRoute);
app.use('/checkout', checkoutRoute);

module.exports.handler = serverless(app);

var express = require('express');
var app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(cors({ credentials: true, origin: process.env.ORIGIN }))
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Middlewares
const auth = require('./apis/auth')
app.use('/auth', auth);
const accounts = require('./apis/accounts')
app.use('/accounts', accounts);
const payments = require('./apis/payments')
app.use('/payments', payments);
const products = require('./apis/products')
app.use('/products', products);
const cart = require('./apis/cart')
app.use('/cart', cart);
const admin = require('./apis/admin')
app.use('/admin', admin);

app.listen(process.env.PORT, function () {
  console.log("Express is running at %d.", process.env.PORT);
})
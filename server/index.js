var express = require('express');
var app = express();
const cors = require('cors');
require('dotenv').config()

app.use(cors({
  origin: "https://test.com"
}))


app.get('/', function (req, res) {
  res.send('Hello World');
})

// Middlewares
const accounts = require('./apis/accounts')

app.use('/accounts', accounts);

app.listen(process.env.PORT, function () {
  console.log("Express is running at %d.", process.env.PORT);
})
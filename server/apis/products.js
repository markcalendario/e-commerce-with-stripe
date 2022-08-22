const DATABASE = require('../db/db');
const path = require('path');
const { jwtVerifyAuthCookie, jwtGetPayload } = require('../functions/jwt');
const { isMongoIDValid } = require('../db/db-validators');
const { ObjectId } = require('mongodb');

const router = require('express').Router()

router.get('/', async (req, res) => {
  const db = await DATABASE()
  db.db("shopitty").collection('products')
    .find().toArray((error, result) => {
      db.close();
      if (error) return res.send({ success: false, message: "An error occured" })
      return res.send({ success: true, message: "Products list fetched successfully", products: result })
    })
})

router.get('/view/:productId', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../uploads/products/" + req.params.productId));
  } catch { }
})

module.exports = router
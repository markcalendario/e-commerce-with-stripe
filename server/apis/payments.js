const { ObjectId } = require('mongodb');
const DATABASE = require('../db/db');
const { isMongoIDValid } = require('../db/db-validators');
const { jwtVerifyAuthCookie, jwtGetPayload, jwtSign, isJWTVerified } = require('../functions/jwt');
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_URI);

async function isProductExists(productId) {
  const db = await DATABASE()
  return await new Promise(resolve => {
    db.db("shopitty").collection("products")
      .findOne({ _id: ObjectId(productId) }, (error, result) => {
        db.close()
        if (error) return res.send({ success: false, message: "An error occured" })
        if (!result) resolve(false)
        resolve(true)
      })
  })
}

// Check out

router.post('/checkout/:productId', jwtVerifyAuthCookie, async (req, res) => {

  const uid = jwtGetPayload(req.cookies.auth).uid

  if (!isMongoIDValid(uid) || !isMongoIDValid(req.params.productId)) {
    return res.send({ success: false, message: "Mongo ID malformed." })
  }

  if (!await isProductExists(req.params.productId)) {
    return res.send({ success: false, message: "Product does not exists." })
  }

  const db = await DATABASE()

  const productData = await new Promise(async resolve => {
    db.db("shopitty").collection("products")
      .findOne({ _id: ObjectId(req.params.productId) }, (error, result) => {
        if (error) {
          db.close()
          return res.send({ success: false, message: "An error occured" })
        }
        resolve(result)
      })
  })

  const purchaseToken = await jwtSign({
    productData: {
      title: productData.title,
      description: productData.description,
      price: productData.price,
      quantity: productData.quantity,
    },
    userId: uid
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "php",
        product_data: {
          name: productData.title,
          description: productData.description,
          images: [process.env.SERVER + "/products/view/" + productData.imageId]
        },
        unit_amount: productData.price * 100,
      },
      quantity: 1
    }],
    success_url: `${process.env.ORIGIN}/purchase-success/${purchaseToken}`,
    cancel_url: `${process.env.ORIGIN}/purchase-cancelled`,
  });

  return res.send({ success: true, checkOutUrl: session.url })
});

// Save Purchase

router.post('/save-purchase/:paymentToken', async (req, res) => {
  // Intentionally not verifying auth cookie to ensure saving on cookie expiry

  if (!await isJWTVerified(req.params.paymentToken)) {
    return res.send({ success: false, isSaveOk: -1, message: "Payment token not valid" })
  }

  const db = await DATABASE()

  // Check if already saved
  await new Promise(resolve => {
    db.db('shopitty').collection('purchases')
      .findOne({ purchaseToken: req.params.paymentToken }, (error, result) => {
        if (error || result) db.close()
        if (error) return res.send({ success: false, isSaveOk: -1, message: "An error occured" })
        if (result) return res.send({ success: true, isSaveOk: 0, message: "Payment is already saved." })

        resolve()
      })
  })

  // if new, then save
  const uid = jwtGetPayload(req.params.paymentToken).userId;
  db.db('shopitty').collection('purchases')
    .insertOne({ userId: ObjectId(uid), purchaseToken: req.params.paymentToken }, (error, result) => {
      db.close()
      if (error) return res.send({ success: false, isSaveOk: -1, message: "An error occured" })
      if (result) return res.send({ success: true, isSaveOk: 1, message: "Payment is successfully saved." })
    })

})

router.get('/my-purchases', jwtVerifyAuthCookie, async (req, res) => {
  const userId = jwtGetPayload(req.cookies.auth).uid;

  const db = await DATABASE()
  db.db('shopitty').collection('purchases')
    .find({ userId: ObjectId(userId) }).toArray((error, result) => {
      if (error) return res.send({ success: false, message: "An error occured" })

      let decodedPurchaseTokenData = []
      result.forEach(value => {
        decodedPurchaseTokenData.push(jwtGetPayload(value.purchaseToken).productData)
      })

      return res.send({ success: true, message: "Purchases is successfully fetched.", data: decodedPurchaseTokenData })
    })
})

module.exports = router

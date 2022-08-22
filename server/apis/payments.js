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
    success_url: `${process.env.ORIGIN}/purchase-success/${await jwtSign({ productId: req.params.productId, userId: uid })}`,
    cancel_url: `${process.env.ORIGIN}/purchase-cancelled`,
  });
  return res.send({ success: true, checkOutUrl: session.url })
});

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
  db.db('shopitty').collection('purchases')
    .insertOne({ purchaseToken: req.params.paymentToken }, (error, result) => {
      db.close()
      if (error) return res.send({ success: false, isSaveOk: -1, message: "An error occured" })
      if (result) return res.send({ success: true, isSaveOk: 1, message: "Payment is successfully saved." })
    })

})

module.exports = router

const { ObjectId } = require('mongodb');
const DATABASE = require('../db/db');
const { isMongoIDValid } = require('../db/db-validators');
const { jwtVerifyAuthCookie, jwtGetPayload, jwtSign } = require('../functions/jwt');
const router = require('express').Router();
const stripe = require('stripe')('sk_test_51LZT8DCHyimBcL1fP3haQirk4pzfWC4Wf8Eua9BeBCSw83uLJImzMrxWFSScOuLaUfzdSJVrOYtzqcmyzKmtqMEg00KHovZSMx');

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

  const productData = await new Promise(async resolve => {
    const db = await DATABASE()
    db.db("shopitty").collection("products")
      .findOne({ _id: ObjectId(req.params.productId) }, (error, result) => {
        db.close()
        if (error) return res.send({ success: false, message: "An error occured" })
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
    success_url: `${process.env.ORIGIN}/purchase-success/${await jwtSign({ productId: req.params.productId, uid: uid })}`,
    cancel_url: `${process.env.ORIGIN}/cancel`,
  });

  return res.send({ success: true, checkOutUrl: session.url })
});

module.exports = router

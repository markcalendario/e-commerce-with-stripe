const { ObjectId } = require('mongodb')
const DATABASE = require('../db/db')
const { isMongoIDValid } = require('../db/db-validators')
const { jwtVerifyAuthCookie, jwtGetPayload } = require('../functions/jwt')
const router = require('express').Router()

router.get('/', jwtVerifyAuthCookie, async (req, res) => {
  const payload = jwtGetPayload(req.cookies.auth)

  if (!isMongoIDValid(payload.uid))
    return res.send({ success: false, message: "Mongo ID malformed." })

  const db = await DATABASE()
  db.db("shopitty").collection('carts')
    .aggregate([
      {
        $match: { userId: ObjectId(payload.uid) }
      }, {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product"
        }
      }, {
        $unwind: "$product"
      }
    ])
    .toArray((error, result) => {
      db.close();
      if (error) return res.send({ success: false, message: "An error occured" })
      return res.send({ success: true, message: "Products list fetched successfully", cartData: result })
    })
})

router.post('/add/:productId', jwtVerifyAuthCookie, async (req, res) => {
  const payload = jwtGetPayload(req.cookies.auth)

  if (!isMongoIDValid(payload.uid) || !isMongoIDValid(req.params.productId)) {
    return res.send({ success: false, message: "Mongo IDs malformed." })
  }

  // Check if product is already in a cart
  const db = await DATABASE()
  await new Promise(resolve => {
    db.db("shopitty").collection("carts")
      .findOne({ productId: ObjectId(req.params.productId), userId: ObjectId(payload.uid) }, (error, result) => {
        if (error || result) db.close()
        if (error) return res.send({ success: false, message: "An error occured" })
        if (result) return res.send({ success: false, message: "This product is already in your cart." })
        resolve()
      })
  })

  // If not in the cart
  db.db("shopitty").collection("carts")
    .insertOne({ productId: ObjectId(req.params.productId), userId: ObjectId(payload.uid) }, (error, result) => {
      db.close()

      if (error) return res.send({ success: false, message: "An error occured" })
      if (result) return res.send({ success: true, message: "This product is added in your cart." })
    })

})

router.post('/remove/:productId', jwtVerifyAuthCookie, async (req, res) => {
  const payload = jwtGetPayload(req.cookies.auth)

  if (!isMongoIDValid(payload.uid) || !isMongoIDValid(req.params.productId)) {
    return res.send({ success: false, message: "Mongo IDs malformed." })
  }

  const db = await DATABASE()

  // If not in the cart
  db.db("shopitty").collection("carts")
    .deleteOne({ productId: ObjectId(req.params.productId), userId: ObjectId(payload.uid) }, (error, result) => {
      db.close()

      if (error) return res.send({ success: false, message: "An error occured" })
      if (result.deletedCount) return res.send({ success: true, message: "This product is deleted from your cart." })
    })

})

module.exports = router
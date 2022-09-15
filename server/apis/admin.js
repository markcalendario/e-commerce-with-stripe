const { ObjectId } = require('mongodb')
const { isMongoIDValid } = require('../db/db-validators')
const DATABASE = require('../db/db');
const { jwtVerifyAuthCookie, jwtGetPayload } = require('../functions/jwt')

const router = require('express').Router()

async function isAdmin(req, res, next) {
  const uid = jwtGetPayload(req.cookies.auth).uid
  const db = await DATABASE();
  db.db('shopitty')
    .collection('admin')
    .findOne({ _id: ObjectId(uid) }, (error, result) => {
      db.close()
      if (error) return res.send({ success: false, message: 'An error occured.' })
      if (!result) return res.clearCookie('auth').status(401).send({ success: false, message: 'You are not authorized.' })
      if (result) next()
    })
}

router.post('/remove-product/:id', jwtVerifyAuthCookie, isAdmin, async (req, res) => {

  if (!isMongoIDValid(req.params.id)) {
    return res.send({ success: false, message: 'Malformed ID' })
  }

  const db = await DATABASE()
  db.db('shopitty')
    .collection('products')
    .deleteOne({ _id: ObjectId(req.params.id) }, (error, result) => {
      db.close()
      if (error) return res.send({ success: false, message: 'An error occured.' })
      return res.send({ success: true, message: `Product ${req.params.id} deleted successfully.` })
    })
})

router.get('/orders', jwtVerifyAuthCookie, isAdmin, async (req, res) => {
  const db = await DATABASE()
  db.db('shopitty')
    .collection('purchases')
    .aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userData'
        }
      },
      {
        $project: {
          'userData.email': 0,
          'userData.password': 0,
          'userData.userName': 0,
          'userData._id': 0,
        }
      },
      {
        $unwind: '$userData'
      }
    ]).toArray((error, result) => {
      if (error) return res.send({ success: false, message: 'An error occured' })
      if (!result) return res.send({ success: false, message: 'No orders found' })

      // Decode the purchase jwt token
      // Will result to the data of the purchased products
      console.log(result[0]._id.getTimestamp());
      const orderData = []
      result.forEach(data => {
        orderData.push({ uid: data._id, productData: jwtGetPayload(data.purchaseToken).productData, fullName: data.userData.fullName })
      })

      if (result) return res.send({ success: true, message: 'Orders found', orders: orderData })
    })
})

module.exports = router
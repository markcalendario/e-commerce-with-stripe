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

module.exports = router
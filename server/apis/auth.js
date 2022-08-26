const { ObjectId } = require('mongodb');
const DATABASE = require('../db/db');
const { isMongoIDValid } = require('../db/db-validators');
const { jwtVerifyAuthCookie, jwtGetPayload } = require('../functions/jwt');

const router = require('express').Router();

router.get("/users", jwtVerifyAuthCookie, async (req, res) => {

  if (!isMongoIDValid(jwtGetPayload(req.cookies.auth).uid)) {
    return res.clearCookie('auth').send({ isAuth: false, message: 'Mongo ID malformed' }).status(401)
  }

  const db = await DATABASE()
  db.db('shopitty')
    .collection('users')
    .findOne({ _id: ObjectId(jwtGetPayload(req.cookies.auth).uid) }, (error, result) => {
      db.close()
      if (error) return res.clearCookie('auth').send({ isAuth: false, message: 'Error occured' }).status(401)
      if (!result) return res.send({ isAuth: false, message: 'Account not a user' }).status(401)
      if (result) return res.send({ isAuth: true, message: 'Authorized' })
    })
})

router.get("/admin", jwtVerifyAuthCookie, async (req, res) => {
  if (!isMongoIDValid(jwtGetPayload(req.cookies.auth).uid)) {
    return res.clearCookie('auth').send({ isAuth: false, message: 'Mongo ID malformed' }).status(401)
  }

  const db = await DATABASE()
  db.db('shopitty')
    .collection('admin')
    .findOne({ _id: ObjectId(jwtGetPayload(req.cookies.auth).uid) }, (error, result) => {
      db.close()
      if (error) return res.clearCookie('auth').send({ isAuth: false, message: 'Error occured' }).status(401)
      if (!result) return res.send({ isAuth: false, message: 'Account not an admin' }).status(401)
      if (result) return res.send({ isAuth: true, message: 'Authorized' })
    })
})

module.exports = router 
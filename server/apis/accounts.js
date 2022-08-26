const moment = require('moment');
const { ObjectId } = require('mongodb');
const DATABASE = require('../db/db');
const { isMongoIDValid } = require('../db/db-validators');
const { jwtSign, jwtVerifyAuthCookie, jwtGetPayload } = require('../functions/jwt');
const { encryptPassword, isPasswordCorrect } = require('../functions/passwords');

const router = require('express').Router();

// Register

function validateRegisterPayload(req, res, next) {
  if (req.body.userName === '') {
    return res.send({ success: false, message: "Username is required." })
  }
  else if (req.body.fullName === '') {
    return res.send({ success: false, message: "Full name is required." })
  }
  else if (req.body.password === '') {
    return res.send({ success: false, message: "Password is required." })
  }
  else if (req.body.password.length < 6) {
    return res.send({ success: false, message: "Password must have at least 6 characters." })
  }

  next();
}

async function isUserNameAlreadyRegistered(req, res, next) {
  const db = await DATABASE();

  db.db("shopitty")
    .collection("users")
    .findOne({ userName: req.body.userName }, (error, result) => {
      if (error) {
        return res.send({ success: false, message: "An error occured." });
      }

      if (result) {
        return res.send({ success: false, message: "User name is already registered." });
      }

      next();
    })

}

router.post("/register", validateRegisterPayload, isUserNameAlreadyRegistered, async (req, res) => {
  const db = await DATABASE();

  db.db("shopitty").collection("users").insertOne({
    userName: req.body.userName,
    password: await encryptPassword(req.body.password),
    fullName: req.body.fullName,
  }, (error, result) => {

    if (error) {
      return res.send({ success: false, message: "An error occured." });
    }

    if (result) {
      return res.send({ success: true, message: "You are now registered." });
    }
  })
})

// Login

function validateLoginPayload(req, res, next) {
  if (req.body.userName === '') {
    return res.send({ success: false, message: "User name is required." });
  }

  if (req.body.password === '') {
    return res.send({ success: false, message: "Password is required." });
  }

  next();
}

router.post('/login', validateLoginPayload, async (req, res) => {
  const db = await DATABASE()

  const userData = await new Promise(resolve => {
    db.db('shopitty')
      .collection('users')
      .findOne({ userName: req.body.userName }, (error, result) => {
        db.close();
        if (error) {
          return res.send({ success: false, message: "An error occured." });
        }

        if (!result) {
          return res.send({ success: false, message: "We can't find your account." });
        }
        resolve(result)
      })
  })

  if (!await isPasswordCorrect(req.body.password, userData.password)) {
    return res.send({ success: false, message: "Password is incorrect." });
  }

  return res.cookie("auth", await jwtSign({ uid: userData._id }), { httpOnly: true }).send({ success: true, message: "You are now logged in." })

})

// Basic Info

router.post('/my-info', jwtVerifyAuthCookie, async (req, res) => {

  const payload = jwtGetPayload(req.cookies.auth)
  if (!isMongoIDValid(payload.uid)) {
    return res.status(401).send({ success: false, message: 'Mongo ID malformed.' })
  }

  const db = await DATABASE()
  db.db('shopitty').collection('users').findOne({ _id: ObjectId(payload.uid) }, (error, result) => {
    db.close();

    if (error)
      return res.send({ success: false, message: 'An error occured.' })

    return res.send({ success: true, message: 'Information fetched successfully.', userData: { fullName: result.fullName, userName: result.userName } })
  })
})

// Sign out

router.post('/sign-out', jwtVerifyAuthCookie, async (req, res) => {
  return res.clearCookie('auth').send({ success: true, message: 'You have been signed out.' })
})

// Admin Login

router.post('/admin-login', validateLoginPayload, async (req, res) => {
  const db = await DATABASE()

  const userData = await new Promise(resolve => {
    db.db('shopitty')
      .collection('admin')
      .findOne({ userName: req.body.userName }, (error, result) => {
        db.close();
        if (error) {
          return res.send({ success: false, message: "An error occured." });
        }

        if (!result) {
          return res.send({ success: false, message: "We can't find your admin account." });
        }
        resolve(result)
      })
  })

  if (!await isPasswordCorrect(req.body.password, userData.password)) {
    return res.send({ success: false, message: "Password is incorrect." });
  }

  return res.cookie("auth", await jwtSign({ uid: userData._id }), { httpOnly: true }).send({ success: true, message: "You are now logged in." })
})

module.exports = router 
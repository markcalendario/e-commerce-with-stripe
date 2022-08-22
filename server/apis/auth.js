const { jwtVerifyAuthCookie } = require('../functions/jwt');

const router = require('express').Router();

router.get("/", jwtVerifyAuthCookie, (req, res) => {
  return res.send({ isAuth: true, message: "Authorized" })
})

module.exports = router 
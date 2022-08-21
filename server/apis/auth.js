const { jwtVerify } = require('../functions/jwt');

const router = require('express').Router();

router.get("/", jwtVerify, (req, res) => {

})

module.exports = router 
const router = require('express').Router();

router.get("/x", (req, res) => {
  res.send({ message: "Hello" })
})

module.exports = router 
const { ObjectId } = require("mongodb");

function isMongoIDValid(uid) {
  return ObjectId.isValid(uid)
}

module.exports = { isMongoIDValid }
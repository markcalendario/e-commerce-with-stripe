const bcrypt = require("bcrypt");

async function encryptPassword(password) {
  return await new Promise(resolve => {
    bcrypt.hash(password, 10, function (err, hash) {
      resolve(hash)
    })
  })
}

async function isPasswordCorrect(plainPassword, hashedPassword) {
  return await new Promise(resolve => {
    bcrypt.compare(plainPassword, hashedPassword, function (err, result) {
      resolve(result)
    });
  })
}

module.exports = { encryptPassword, isPasswordCorrect }
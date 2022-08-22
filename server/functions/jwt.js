const jwt = require('jsonwebtoken');

async function jwtSign(payload) {
  return await new Promise(resolve => {
    jwt.sign(payload, "w8evDAiGSswMkoxchWVJ5E8Q2DzteW8k", { expiresIn: '12h' }, (error, token) => {
      resolve(token)
    })
  })
}

async function jwtVerifyAuthCookie(req, res, next) {
  if (typeof req.cookies.auth === 'undefined') {
    return res.send({ isAuth: false, message: "Token not found." })
  }

  jwt.verify(req.cookies.auth, 'w8evDAiGSswMkoxchWVJ5E8Q2DzteW8k', function (err, decoded) {
    if (err) {
      return res.clearCookie('auth').send({ isAuth: false, message: err.message })
    }

    next();
  })
}

function jwtGetPayload(token) {
  return jwt.decode(token);
}

module.exports = { jwtSign, jwtVerifyAuthCookie, jwtGetPayload }
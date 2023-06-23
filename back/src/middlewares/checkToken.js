const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  console.log("Verificando...", req.headers.authorization);
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ msg: "403 - NEGADO" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    console.log("OK!!");
    next();
  } catch (error) {
    res.status(400).json({ msg: "400 - BAD REQUEST" });
  }
}

module.exports = checkToken;
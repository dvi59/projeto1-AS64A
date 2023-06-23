const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { publishErrorResponse, publishSuccessResponse } = require('../rabbitMQUtils');

const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email) {
        return publishErrorResponse(res, 'Email obrigatório');
    }
  
    if (!password) {
        return publishErrorResponse(res, 'Senha obrigatório');
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return publishErrorResponse(res,  "Usuário ou Senha inválidos");
      }
  
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return publishErrorResponse(res,  "Usuário ou Senha inválidos");
      }
  
      const tipo = user.tipo;
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
  
      res.cookie("token", token, {
        httpOnly: true,
      }).status(200).json({ msg: "AUTENTICADO COM SUCESSO", token, tipo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "ERROR!" });
    }
  };
  
  module.exports = {
    login,
  };
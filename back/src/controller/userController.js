const User = require('../model/User')
const bcrypt = require('bcrypt');
const { publishErrorResponse, publishSuccessResponse } = require('../rabbitMQUtils')


const addUser = async (req,res) =>{
    const { name, email, password,tipo } = req.body

    if (!name) {
        return publishErrorResponse(res, 'Nome obrigatório');
    }
    if (!email) {
        return publishErrorResponse(res, 'Email obrigatório');
    }
    if (!password) {
        return publishErrorResponse(res, 'Senha obrigatório');
    }
  

    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return publishErrorResponse(res, 'Usuário já existe na base de dados');
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordHash,
        tipo,
    })

    try {
        await user.save()
        return publishSuccessResponse(res, 'Usuário Cadastrado com sucesso');
    } catch (err) {
        console.log(err)
        return publishErrorResponse(res, 'Erro')
    }
};

module.exports = {
    addUser,
};
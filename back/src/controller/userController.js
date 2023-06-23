const User = require('../model/User')

const addUser = async (req,res) =>{
    const { name, email, password,tipo } = req.body

    if (!name) {
        return res.status(422).json({ msg: "Nome obrigatório" })
    }
    if (!email) {
        return res.status(422).json({ msg: "Email obrigatório" })
    }
    if (!password) {
        return res.status(422).json({ msg: "Senha obrigatório" })
    }
    if (!tipo && tipo === 0){
        return res.status(422).json({ msg: "Informe o Tipo"})
    }

    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({ msg: "Esse email já existe na base de dados" })
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
        res.status(200).json({ msg: 'Usuário Cadastrado com sucesso' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'ERROR!' })
    }
};

module.exports = {
    addUser,
};
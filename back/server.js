require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./src/routes')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const app = express()
const User = require('./src/model/user')
const Car = require('./src/model/car')
app.use(cors(null))
app.use(cookieParser())
app.use(express.json())
app.use(routes)


mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://root:root@cluster0.rwu0yz6.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(1337)
        console.log('SERVER START!!')
    })
    .catch((err) => console.log(err))


app.get('/car/search',checkToken, async (req, res) => {
    const car = await Car.find()
    if (!car) {
        return res.status(404).json({ msg: "Veículo Não encontrado" })
    }
    res.status(200).json({ car })
})

function checkToken(req, res, next) {
    console.log("Verificando...", req.headers.authorization)
    const token = req.headers.authorization
    if (!token) {
        return res.status(403).json({ msg: "Acesso Negado!" })
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
        console.log("TOKEN PERSISTIDO COM COOKIES!!!")
    } catch (error) {
        res.status(400).json({ msg: "Token Invaldo" })
    }
}

app.post('/auth/register', async (req, res) => {
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


})

app.post('/car/register', checkToken,async (req, res) => {
    const { name, modelo, ano } = req.body
    if(!name || !modelo || !ano){
        return res.status(422).json({ msg: "Todos os campos são obrigatórios" })
    }

    const car = new Car({
        name,
        modelo,
        ano,
    })
    try {
        await car.save()
        res.status(200).json({ msg: 'Veículo cadastrado com sucesso' })
    } catch (error) {
        console.log(error)
    }
})



app.post('/auth/login', async (req, res) => {

    const { email, password } = req.body
    if (!email) {
        return res.status(422).json({ msg: "Email é obrigatório" })
    }
    if (!password) {
        return res.status(422).json({ msg: "Senha é obrigatório" })
    }
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(422).json({ msg: "Usuário ou Senha inválidos" })
    }

    const checkPasswprd = await bcrypt.compare(password, user.password)
    if (!checkPasswprd) {
        return res.status(422).json({ msg: "Usuário ou Senha inválidos" })
    }

    try {
        const tipo = user.tipo
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,

        )
        res.cookie("token", token, {
            httpOnly: true,
        }).status(200).json({ msg: "AUTENTICADO COM SUCESSO", token, tipo })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'ERROR!' })
    }
})




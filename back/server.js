require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const mongoose = require('mongoose')
const app = express()

const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const carRoutes = require('./src/routes/carRoutes')
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/car', carRoutes);



mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://root:root@cluster0.rwu0yz6.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(1337)
        console.log('Servidor na porta 1337')
    })
    .catch((err) => console.log(err))




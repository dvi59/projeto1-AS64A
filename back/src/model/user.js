const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tipo:String,
})

const user = mongoose.model('user', DataSchema)
module.exports = user;
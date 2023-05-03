const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name: String,
    modelo: String,
    ano: String,
    foto: String, 
})

const car = mongoose.model('car', DataSchema)
module.exports = car;
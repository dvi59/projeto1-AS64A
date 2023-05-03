const User = require('../model/user')

module.exports = {
    async index(req,res){
        const user = await User.find();
        res.json(user)
    },

    async store(req,res){
        const {name,pass,email} = req.body;

        var dataCreate = {}

        dataCreate = {
            name,pass,email
        }
        const user = await User.create(dataCreate)
        res.json(user)
    }
    
}
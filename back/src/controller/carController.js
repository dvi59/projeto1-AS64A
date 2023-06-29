const Car = require('../model/Car')
const Redis = require('redis')

const client = Redis.createClient();
client.on('error', err => console.log('Redis Client Error', err));



const redisHost = 'localhost';
const redisPort = 6379;
const redisPassword = 'root';
const DEFAULT_EXPIRATION = '3600';

// Criação do cliente Redis com as configurações

const { publishErrorResponse, publishSuccessResponse } = require('../rabbitMQUtils')
const { validationResult } = require('express-validator');
const { sanitizeObject } = require('../sanitizerUtil');

const searchCars = async (req, res) => {
    await client.connect();
    try {
        const cachedCars = await client.get('cars');
        if (cachedCars) {
            const cars = JSON.parse(cachedCars);
            return res.status(200).json({ car: cars });
        } else {
            console.log("Load Mongo")
            const cars = await Car.find();

            if (!cars) {
                return publishErrorResponse(res, "Veículo não encontrado");
            }

            client.set('cars', JSON.stringify(cars));
            return res.status(200).json({ car: cars });
        }
    } catch (err) {
        return publishErrorResponse(res, 'Erro ao buscar carros');
    } finally {
        await client.disconnect();
    }
};

const addCar = async (req, res) => {
    const { name, modelo, ano } = req.body
    if (!name || !modelo || !ano) {
        return publishErrorResponse(res, 'Todos os campos são obrigatórios');
    }

    const car = new Car({
        name,
        modelo,
        ano,
    })

    try {
        await car.save()
        return publishSuccessResponse(res, 'Veículo cadastrado com sucesso');
    } catch (error) {
        console.log(error)
    }

};


module.exports = {
    searchCars,
    addCar,
};

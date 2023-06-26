const Car = require('../model/Car')
const redis = require('redis');
const client = redis.createClient();
const { publishErrorResponse, publishSuccessResponse } = require('../rabbitMQUtils')
const { validationResult } = require('express-validator');
const { sanitizeObject } = require('../sanitizerUtil');

const searchCars = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return publishErrorResponse(res, "Erro")
        }

        client.get('cars', async (error, cachedCars) => {
            if (error) throw error;

            if (cachedCars) {
                const cars = JSON.parse(cachedCars);
                return res.status(200).json({ cars });
            } else {

                const cars = await Car.find();

                if (!cars) {
                    return publishErrorResponse(res, "Veículo Não encontrado");
                }
                const sanitizedCars = cars.map((car) => sanitizeObject(car));
                client.set('cars', JSON.stringify(sanitizedCars));
                res.status(200).json({ cars:sanitizedCars });
            }
        });

    } catch (err) {
        return publishErrorResponse(res, 'Erro ao buscar carros');
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

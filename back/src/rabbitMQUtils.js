const amqp = require('amqplib');

async function publishErrorResponse(res, errorMsg) {
    const message = JSON.stringify({ error: errorMsg });
    await publishMessage(message);

    return res.status(422).json({ msg: errorMsg });
}

async function publishSuccessResponse(res, successMsg) {
    const message = JSON.stringify({ success: successMsg });
    await publishMessage(message);

    return res.status(200).json({ msg: successMsg });
}

async function publishMessage(message) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = 'meu_exchange';
        const routingKey = 'minha_fila';

        await channel.assertExchange(exchange, 'direct');
        await channel.publish(exchange, routingKey, Buffer.from(message));

        console.log('Mensagem publicada:', message);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Erro ao publicar a mensagem:', error);
    }
}

module.exports = {
    publishErrorResponse,
    publishSuccessResponse,
};
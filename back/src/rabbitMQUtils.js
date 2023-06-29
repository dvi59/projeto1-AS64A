const amqp = require('amqplib');
const moment = require('moment');
//const io = require('socket.io')();
//const userId = 

async function publishErrorResponse(res, errorMsg) {
    const message = JSON.stringify({ error: errorMsg });
    await publishMessage("admin", message);

    return res.status(422).json({ msg: errorMsg });
}

async function publishSuccessResponse(res, successMsg) {
    const message = JSON.stringify({ success: successMsg });
    await publishMessage("admin", message);

    return res.status(200).json({ msg: successMsg });
}

async function publishMessage(queue, message) {
    try {
        const timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
        const messageWithTimestamp = `${timestamp}: ${message}`;


        const connection = await amqp.connect('amqp://localhost');
        const channel = await (connection).createChannel();

        channel.sendToQueue(queue, Buffer.from(messageWithTimestamp));

        console.log('Mensagem publicada:', messageWithTimestamp);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Erro ao publicar a mensagem:', error);
    }
}

async function consumeMessages(queue,io) {
    try {
        // Conectar ao servidor RabbitMQ
        const connection = await amqp.connect('amqp://localhost');

        // Criar um canal
        const channel = await connection.createChannel();
        
        // Verificar se a fila existe, caso contrário, criá-la
        await channel.assertQueue(queue);

        console.log('Aguardando mensagens. Pressione CTRL+C para sair.');
       

        // Consumir as mensagens da fila
        channel.consume(queue, (message) => {
            if (message !== null) {
                const content = message.content.toString();
                console.log('Mensagem recebida:', content);
                io.emit('Message', content);
                // Confirmar o processamento da mensagem
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('Erro ao consumir mensagens:', error);
    }
}

module.exports = {
    publishErrorResponse,
    publishSuccessResponse,
    consumeMessages,
};
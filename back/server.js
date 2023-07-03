require('dotenv').config()
const express = require('express');
const fs = require('fs')
const session = require('express-session');
const app = express();
const server = require('https').createServer(
    {
        cert: fs.readFileSync('./src/httpsOptions/domain.crt'),
        key: fs.readFileSync('./src/httpsOptions/private.key'),
        passphrase: 'banana12',
    },
    app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    },
});

const cookieParser = require('cookie-parser')
const cors = require('cors')
const { morganMiddleware } = require('./src/loggerUtils');
const limiterMiddleware  = require('./src/httpLimiter');
const { consumeMessages } = require('./src/rabbitMQUtils')


const mongoose = require('mongoose')


const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const carRoutes = require('./src/routes/carRoutes');

//Opções do servidor
const options = {
    maxPoolSize: 10, 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

app.use(morganMiddleware)
app.use(limiterMiddleware)
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(session({
    secret: 'banoff@@123/va3w1@@4',
    resave: false,
    saveUninitialized: true,
}));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/car', carRoutes);



mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://root:root@cluster0.rwu0yz6.mongodb.net/?retryWrites=true&w=majority',options)
    .then(() => {
        app.listen(1337)
        console.log('Servidor na porta 1337')
    })
    .catch((err) => console.log(err))




io.on('connection', async(socket) => {

   console.log("Conectado...WS")
  
    socket.on('disconnect', () => {
        socket.disconnect();
    });

    socket.on('solicitar-mensagens', () =>{
        consumeMessages('admin',io);
    })
});



server.listen(4000, () => {
    console.log("WebSocket na porta 4000")
})

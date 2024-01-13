const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const app = express();

app.use(cors());
app.use(express.json());                           
app.use(express.urlencoded({ extended: true })); 
require('./config/mongoose.config');
require('./routes/pirate.routes')(app);

const server = app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
})

io.on('connection', (socket) => {
    console.log('New client connected')
    socket.on('toServer', data => {
        io.emit('toClient', data);
    });
    socket.on('disconnected', () => {
        console.log('Client disconnected')
    })
})
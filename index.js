const express = require('express');
const app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);
let history = {};


app.get('/', (req, res) =>
{
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) =>
{
    socket.on('join-chat', (data) =>
    {
        socket.join(data.id);
        io.sockets.in(data.id).emit('join-chat', data);
    });
    socket.on('leave-chat', (data) =>
    {
        io.sockets.in(data.id).emit('leave-chat', data);
        socket.leave(data.id);
    });

    socket.on('history', (id) =>
    {
        if (history[`${id}`] != null) {
            var data = {
                'status': true,
                'command': 'history',
                'id': id,
                'messages': history[`${id}`],
            };
            socket.emit('history', data);
            console.log(data);
        } else {
            var data = {
                'status': false,
                'command': 'history',
                'id': id,
                'messages': [],
            };
            io.sockets.in(id).emit('history', data);
        }
    });

    socket.on('message', (message) =>
    {
        if (history[`${message.id}`] == null) {
            history[`${message.id}`] = [];
        }
        history[`${message.id}`].push(message);
        if (history[`${message.id}`].length > 10) {
            history[`${message.id}`].shift();
        }
        io.sockets.in(message.id).emit('message', message);
    });
});

server.listen(3000, () =>
{
    console.log('listening port :3000');
});
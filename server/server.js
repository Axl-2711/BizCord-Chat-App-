import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
import { formatMessage } from './utils/messages.js';
import { userJoin, getConnectedUser } from './utils/users.js'
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server)

const botName = 'BizCord Bot';

//RUN WHEN CLIENT CONNECTS
io.on('connection', (socket) => {

    // User Joins room
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)


        socket.join(user.room)

        // Send user a welcome message
        socket.emit('message', formatMessage(botName, `Welcome to ${botName}`));

        // Broadcast to all users except the current user
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${username} has joined the chat`));
    })



    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'))
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg))
    })
});

app.use(express.static(path.join(path.resolve(), '/public')));


server.listen(process.env.PORT || 3000, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT || 3000}`);
});
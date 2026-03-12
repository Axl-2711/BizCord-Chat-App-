import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
import { formatMessage } from './utils/messages.js';
import { userJoin, getConnectedUser, userLeave, getRoomUsers } from './utils/users.js'
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
        socket.emit('message', formatMessage(botName, `Welcome to BizCord`));

        // Broadcast to all users except the current user
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // console.log(user.room)

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    })



    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
        }

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getConnectedUser(socket.id);
        if (!user) return;
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    })
});

app.use(express.static(path.join(path.resolve(), '/public')));


server.listen(process.env.PORT || 3000, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT || 3000}`);
});
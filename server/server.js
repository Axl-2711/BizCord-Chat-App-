import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server)

//RUN WHEN CLIENT CONNECTS
io.on('connection', (socket) => {

    // Send user a welcome message
    socket.emit('message', 'Welcome to BizCord')

    // Broadcast to all users except the current user
    socket.broadcast.emit('message', 'A user has joined the chat')

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg)
    })
});

app.use(express.static(path.join(path.resolve(), '/public')));


server.listen(process.env.PORT || 300, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT || 3000}`);
});
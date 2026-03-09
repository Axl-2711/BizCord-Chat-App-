import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://localhost:${process.env.PORT || 3000}`,
        methods: ['GET', 'PUT']
    }
});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});

server.listen(process.env.PORT || 3001, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT || 3000}`);
});
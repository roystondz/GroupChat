//if we are using ES6 this is the way of using env variables
import 'dotenv/config.js';

import app from './app.js';
import http from 'http'
import jwt from 'jsonwebtoken';
import  {Server} from 'socket.io';

const port = process.env.PORT || 3003;

const server = http.createServer(app);

// const server = require('http').createServer();
const io = new Server(server,{
    cors:{
        origin:'*',
    }
});

io.use((socket, next) => {
    try{
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        if(!token){
            return next(new Error("Authentication Error"));
        }
        const decoded = jwt.verify(token,process.env.SECRET);
        if(!decoded){
            return next(new Error("Authentication Error"));
        }
        socket.user = decoded;

        next();
    }catch(err){
        next(err);
    }
})

io.on('connection', socket => {
    console.log('a user connected');
    
  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});


server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
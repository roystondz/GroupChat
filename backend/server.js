//if we are using ES6 this is the way of using env variables
import 'dotenv/config.js';

import app from './app.js';
import http from 'http'
import jwt from 'jsonwebtoken';
import  {Server} from 'socket.io';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';
import { genearteResponse } from './services/gemini.service.js';


const port = process.env.PORT || 3003;

const server = http.createServer(app);

// const server = require('http').createServer();
const io = new Server(server,{
    cors:{
        origin:'*',
    }
});

io.use(async(socket, next) => {
    try{
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];

        const projectId = socket.handshake.query.projectId;
        if(!projectId){
            return next(new Error("Project Id is required"));
        }
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error("Invalid Project Id"));
        }

        socket.project=await projectModel.findById(projectId);

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
    socket.room = socket.project._id.toString()
    socket.join(socket.room);
    
    socket.on('project-message', async data => {
        const message = data.message;
        const aiIsPresent = message.includes('@ai');
        socket.broadcast.to(socket.room).emit('project-message', data,{

        });
        if(aiIsPresent){

            const prompt = message.replace('@ai','');
            const result = await genearteResponse(prompt);
            io.to(socket.room).emit('project-message', {
                message:result,
                sender:{
                    email:"AI",
                    _id:"ai"
                }
            });
        return ;
        }

        socket.broadcast.to(socket.room).emit('project-message', data,{

        });
    });

    socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { 
    console.log('user disconnected');
    socket.leave(socket.room);
   });
});


server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import http from 'http'

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
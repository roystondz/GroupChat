import connect from './db/db.js';
import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.route.js'
import projectRoutes from "./routes/project.route.js"
import aiRouter from "./routes/ai.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';

connect();
const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/users",userRoutes);
app.use("/projects",projectRoutes);
app.use("/ai",aiRouter);
app.get("/",(req,res)=>{
    res.send("Hello World");
})

export default app;
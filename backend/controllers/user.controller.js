import userModel from "../models/user.model.js";
import * as userService from '../services/user.service.js';
import { validationResult } from "express-validator";

export const createUserController = async (req,res)=>{
     const errors = validationResult(req);
        //it forms an array
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
     }
     try{
        const user = await userService.createUser(req.body);
        const token = user.generateJWT();
        res.status(201).json({user,token});
     }catch(err){
        res.status(400).send(err.message)
     }
}
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

export const loginController = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({erros:error.array()});
    }

    try{
        const {email,password} =  req.body;
        const user = await userModel.findOne({email}).select("+password"); //since we have given select while defining the model
        if(!user){
            res.status(401).json({errors:'invalid credentials'});
        }

        const isMatch = await user.isValidPassword(password); 
        if(!isMatch){
            res.status(401).json({
                errors:"Invalid credentials"
            })
        }
        
        const token = await user.generateJWT();

        res.status(200).json({user,token});
        
    }catch(err){
        res.status(400).send(err.message);
    }
    
}

export const profileController = async (req,res)=>{
    res.status(200).json({
        user:req.user
    })
}
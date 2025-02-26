import userModel from "../models/user.model.js";
import * as userService from '../services/user.service.js';
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req,res)=>{
     const errors = validationResult(req);
        //it forms an array
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
     }
     try{
        const user = await userService.createUser(req.body);
        const token = user.generateJWT();
        delete user._doc.password;
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
            return res.status(401).json({errors:'invalid credentials'});
        }

        const isMatch = await user.isValidPassword(password); 
        
        if(!isMatch){
            res.status(401).json({
                errors:"Invalid credentials"
            })
        }
        
        const token = await user.generateJWT();
        //ensuring the password doesnt reaches the frontend
        delete user._doc.password;
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

export const logoutController = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        redisClient.set(token,'logout','EX',60*60*24);
        res.status(200).json({
            message:"Logout successfully"
        })
    }catch(err){
        res.status(401).send(err.message);
    }
}

export const getAllUser = async(req,res)=>{
    try{
        const loggedInUser = await userModel.findOne({email:req.user.email});

        const allUsers = await userService.getAllUser({userId:loggedInUser._id});

        return res.status(200).json({AllUsers : allUsers})

    }catch(err){
        res.status(400).json({error:err.message})
    }
}
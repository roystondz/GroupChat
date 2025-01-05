import ProjectModel from "../models/project.model.js";
import * as projectService from "../services/project.service.js";
import {validationResult} from "express-validator"
import UserModel from "../models/user.model.js"

export const createProject = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            errors:errors.array()
        })
    }

    try{
    const {name} = req.body;

    const loggedInUser = await UserModel.findOne({email:req.user.email});
    const userId = loggedInUser._id;
        
    const newProject = await projectService.createProject({name,userId});

    res.status(201).json({newProject});
    }catch(err){
        res.status(401).send(err.message);
    }

}
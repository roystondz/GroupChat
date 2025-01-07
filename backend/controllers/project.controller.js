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

export const getAllProjects = async(req,res)=>{
    try{
        const loggedInUser = await UserModel.findOne({email:req.user.email});
        const allUserProjects = await projectService.getAllProjectsByUserId({userId: loggedInUser._id});
        return res.status(200).json({
            allUserProjects: allUserProjects
        }

        )
    }catch(err){
        console.log(err);
        res.status(401).json({error:err.message});
    }
}

export const addUserToProject = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {projectId,users} = req.body;
        const loggedInUser = await  UserModel.findOne({email:req.user.email});
        const project = await projectService.addUserToProject({
            projectId,users,userId:loggedInUser._id
        })
        res.status(200).json({updatedProject : project});
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

export const getProjectById = async(req,res)=>{
    //project id passed in params
    const {projectId} = req.params;
    try{
        const project = await projectService.getProjectById({projectId});
        return res.status(200).json({Project:project});
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
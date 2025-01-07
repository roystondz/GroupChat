import mongoose from "mongoose";
import ProjectModel from "../models/project.model.js";

export const createProject=async({
    name,
    userId
})=>{
    if(!name){
        throw new Error('Name is required');
    }
    if(!userId){
        throw new Error('Usr id is required');
    }
    const project = await ProjectModel.create({
        name,
        users:[userId]
    })

    return project;
}

export const getAllProjectsByUserId = async({
    userId
})=>{
    if(!userId){
        throw new Error('User id is required');
    }
    const allUserProjects = await ProjectModel.find({
        users:userId
    })

    return allUserProjects;
}

export const addUserToProject = async({
    projectId,users,userId
})=>{
    if(!projectId){
        throw new Error('Project Id is required');
    }
    if(!users){
        throw new Error('Users is required');
    }
    //checking if the Ids are valid
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid Porject Id');
    }
    if(users.some(userId=>!mongoose.Types.ObjectId.isValid(userId))){
        throw new Error('Invalid userId(s) in users array');
    }

    if(!userId){
        throw new Error('User is required');
    }
    //checking if the Ids are valid
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error('Invalid User Id');
    }

    //checking if the project is valid or not
    const project =  await ProjectModel.findOne({_id:projectId,
        //ensuring the user wanting to add belong to the project 
        users:userId
    })

    if(!project){
        throw new Error('User not belong to this project');
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate({
        _id:projectId
    },{
        $addToSet:{
            users:{
                $each:users
            }
        }
    },{
        new:true
    })

    return updatedProject;
}
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
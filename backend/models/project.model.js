import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'Project name must be unique'], //specifying
        trim:true,
        lowercase:true,
        required:true,
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
})

const Project = mongoose.model("project",projectSchema);

export default Project;
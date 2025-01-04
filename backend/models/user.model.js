import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        minLength:[6,'Email must be atleast 6 characters'],
        maxLength:[50,'Email cannot exceed 50 characters']
    },
    password:{
        type:String,
        select:false //ensuring the password never reaches the frontend
    }
})

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJWT = function(){
    return jwt.sign(
        {email:this.email},
        process.env.SECRET,
        {expiresIn:'24h'});
}

const User  = mongoose.model("user",userSchema);

export default User;


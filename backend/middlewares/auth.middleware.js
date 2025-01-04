import jwt from 'jsonwebtoken'

export const authuser = async (req,res,next)=>{
    try{
        let token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token){
            res.status(401).json({error:"Please authenticate"});
        }
        let decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();

    }catch(err){
        res.status(401).json({error:"Please authenticate"});
    }
}
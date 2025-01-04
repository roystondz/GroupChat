import jwt from 'jsonwebtoken'
import redisClient from '../services/redis.service.js';

export const authuser = async (req,res,next)=>{
    try{
        let token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token){
            res.status(401).json({error:"Please authenticate"});
        }

        const isBlackListed = await redisClient.get(token);

        if(isBlackListed){
            res.cookies('token','');
            res.status(401).json({error:"unauthorized user"});
        }
        let decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();

    }catch(err){
        res.status(401).json({error:"Please authenticate"});
    }
}
import passport from './passport';
import jwt from 'jsonwebtoken';
import { AsyncLocalStorage } from 'async_hooks';
import { stat } from 'fs/promises';

class UserMiddleware{
    Authenticate = (req, res, next)=>{
        passport.authenticate('local', {session: false}, async (error , user)=>{
            if(error){
                const {status, message}=error;
                res.status(status).json({message});
                return;
            }
            // if(!user){
            //     res.status(400).json({ message:'登入失敗'});
            //     return;
            // }
            const data ={
                id:user.id,
                expireTime:new Date().getTime()+10*60*1000
            }
            const token = jwt.sign(data,process.env.App_KEY);
            res.status(200).json({message: `找尋成功!` ,token:`${token}`});
        })(req, res, next);
    }

    //解密
    decodeToken=(token)=>{
        try{
            return jwt.verify(token,process.env.App_KEY);
        }
        catch(err){
            return err
        }
    }

    jwtAuthenticate = async(req, res, next)=>{
        passport.authenticate('jwt', {session:false},async(err, user, info)=>{
            if(info){
                res.status(401).json({message:'尚未登入!'})
            }
            if(err){
                const {status, message} = err;
                res.status(status).json({message});
                return;
            }
            const {id} = user;
            req.id=id;
            next();
        })(req, res, next);
    }
    
}




export default new UserMiddleware();
import models from  '../models/index';
import _ from 'lodash';
const {users} = models;

class UserController{
    getUser = async (req,res) =>{
       const {email} = req.query;
       const user = await users.findOne({
           where: {
               email
           }
       });
       const users=_.map(user,(o)=>{
           return {
               ...o,
               vip: true,
           }
       })
        res.status(200).json({user})
    }

    postUser = async (req,res)=>{
        const {body} = req;
        const {email,password}=body
        const user = await users.create({
            email,
            password
        })
        console.log(user);
        res.status(200).json({user})
    }
}

export default new UserController();
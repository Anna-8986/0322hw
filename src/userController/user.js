import models from  '../models/index';
import _ from 'lodash';
const {users} = models;

class UserController{
    getUser = async (req,res) =>{
       const user = await users.findAll({
           attributes:{ exclude: ['password']}
       });
       const response=_.map(user,(o)=>({           
            ...o.dataValues,
            vip: true,    
        }));
        res.status(200).json({response})
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

    deleteUser = async (req,res)=>{
        const {body} = req;
        const {email}=body
        const user = await users.send({
            email,
            password
        })
        console.log(user);
        res.status(200).json({user})
    }
}

export default new UserController();
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
        const user = await users.destroy({
            where : {email}
        })
        console.log(user);
        // const user = await users.findOne({
        //     where :{email : email}
        //  });
        res.status(200).json({user})
    }
    updateUser = async (req,res)=>{
        const {body} = req;
        const {email,password}=body
        const user = await users.update({
           password:password
        },{
             where : {
                 email
                }
            
        });    
        console.log(user);
        res.status(200).json({user})
    }

}

export default new UserController();
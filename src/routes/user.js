import {Router} from 'express';
import UserController from '../userController/user';

const router = Router();

// router.get('/',(req,res)=>{
//     res.status(200).json({message:'hihihihi'})
// })

//Get: /api/user
router.get('/',UserController.getUser);
//POST: /api/user
router.post('/',UserController.postUser)
router.patch('/',UserController.updateUser)
router.delete('/',UserController.deleteUser)

export default router;
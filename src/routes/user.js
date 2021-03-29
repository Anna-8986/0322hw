import {Router} from 'express';
import UserController from '../userController/user';
import UserMiddleware from '../middlewares/user';
const router = Router();

// router.get('/',(req,res)=>{
//     res.status(200).json({message:'hihihihi'})
// })

//Get: /api/user
router.get('/',UserController.getUser);
//POST: /api/user/find
router.post('/',UserController.postUser);
router.post('/find',UserMiddleware.Authenticate);
router.patch('/',UserController.updateUser);
router.delete('/',UserController.deleteUser);

export default router;
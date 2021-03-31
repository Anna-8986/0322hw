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
router.get('/get',UserMiddleware.jwtAuthenticate, UserController.getUser);
router.post('/find',UserMiddleware.Authenticate, UserController.getUser);
router.post('/',UserController.postUser);
router.patch('/',UserController.updateUser);
router.delete('/',UserController.deleteUser);

export default router;
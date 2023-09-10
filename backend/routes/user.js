import Express from "express";
const router = Express.Router();
import { loginUser, registorUser } from '../controllers/userController.js'

router.route('/signup').post(registorUser);
router.route('/login').post(loginUser);


export default router;
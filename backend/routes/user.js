import Express from "express";
const router = Express.Router();
import { registorUser } from '../controllers/userController.js'

router.route('/signup').post(registorUser);


export default router;
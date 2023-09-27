import Express from "express";
const router = Express.Router();
import { getAllQuestions, createQuestion } from '../controllers/questionController.js'
import authenticate from '../middlewares/authMiddleware.js'

router.route('/').get(authenticate, getAllQuestions);
router.route('/').post(authenticate, createQuestion);


export default router;
import Express from "express";
const router = Express.Router()
import userRoutes from './userRoutes.js';
import questionRoutes from './questionRoutes.js';

router.get('/', (req, res) => {
    res.send('Home API');
})

router.use('/users', userRoutes)
router.use('/questions', questionRoutes)

export default router;
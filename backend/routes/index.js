import Express from "express";
const router = Express.Router()
import user from './user.js';

router.get('/', (req, res) => {
    res.send('Home API');
})

router.use('/user', user)

export default router;
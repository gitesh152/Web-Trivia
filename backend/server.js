import 'dotenv/config'
import Express from 'express';
const app = Express();
const PORT = process.env.PORT || 3000
import connectDb from './config/mongoose.js'
connectDb();
import cors from 'cors'
import cron from 'node-cron';

import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

import apiRoute from './routes/index.js'

cron.schedule('*/10 * * * *', () => {
    //'Pinging server at every 10 min.';
    fetch('http://localhost:3000/keep-alive').then(async (res) => console.log(await res.text())).catch(e => console.log(e))
});

app.get('/keep-alive', (req, res) => {
    res.send('Server is alive');
});

app.use(cors());
app.use(Express.json())
app.use(notFound)
app.use(errorHandler)

app.use('/api', apiRoute);

app.listen(PORT, () => console.log(`server started listining on port ${PORT}`));
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
import path from 'path';
import axios from 'axios';

// cron.schedule('*/1 * * * *', () => {
//     //'Pinging server at every 10 min.';
//     fetch(`http://localhost:${PORT}/keep-alive`).then(async (res) => console.log(await res.text())).catch(e => console.log(e))
// });

setInterval(() => {
    axios.get(`http://localhost:${PORT}/keep-alive`).then(async (res) => console.log(await res.text())).catch(e => console.log(e))
}, 1 * 60 * 1000)

app.use(cors());
app.use(Express.json())

app.get('/keep-alive', (req, res) => {
    res.send('Server is alive');
});

app.use('/api', apiRoute);

// --------------------------deployment------------------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(Express.static(path.join(__dirname1, "/frontend/dist")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
    );
}
else {
    app.get("/", (req, res) =>
        res.send("API is running..")
    );
}
// --------------------------deployment------------------------------

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`server started listining on port ${PORT}`));
import 'dotenv/config'
import Express from 'express';
const app = Express();

import connectDb from './config/mongoose.js'
connectDb();

import cors from 'cors'
app.use(cors());
app.use(Express.json())

import apiRoute from './routes/index.js'
app.use('/api', apiRoute);

// --------------------------deployment------------------------------
import path from 'path';
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

import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started listining on port ${PORT}`));
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected : ${con.connection.host}`)
    }
    catch (e) {
        console.log('Error', e.message)
        process.exit();
    }
}

export default connectDb;
import mongoose from "mongoose";


const connectDb = ()=>{
    const db = process.env.MONGODB_URI ||'mongodb://localhost/my-database';
    mongoose.connect(db)
       .then(() => console.log("MongoDB Connected..."))
       .catch((err) => console.error(err));
}

export default connectDb;
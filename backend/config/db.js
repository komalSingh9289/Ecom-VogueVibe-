import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MongoDB_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        
    }
}
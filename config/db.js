import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Databse connected successfully')
    }catch(error){
        console.log('Error in connecting database', error)
    }
}




// CR8IfsjAwOmBFIvA
// mongodb+srv://rutujamahale39:CR8IfsjAwOmBFIvA@cluster0.xsl6cum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
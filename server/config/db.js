const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect(process.env.MongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }    
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;
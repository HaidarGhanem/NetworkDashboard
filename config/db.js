const mongoose = require ('mongoose')

const connectdb = async()=>{
    try{
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.mongoURI)
        console.log(`mongodb server has connected successfully on host ${conn.connection.host}`)
    }
    catch(e){
        console.log(e)
    }
}

module.exports = connectdb
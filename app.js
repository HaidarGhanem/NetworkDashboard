
//to require the data from env cause its secret
const dotenv = require('dotenv')
dotenv.config()

//importing
const express = require ('express')

//initialization
const app = express()
const PORT = 3000 || process.env.PORT

//middlewares
app.use(express.json()) //so we can pass the JSON thru the server from different files
app.use('/dashboard' , require('./routes/board'))
// app.use('/dashboard/haradwareInfo' , require('./routes/haradwareInfo'))
// app.use('/dashboard/protocols' , require('./routes/protocols'))
// app.use('/dashboard/security' , require('./routes/security'))
// app.use('/dashboard/troubleshooting' , require('./routes/troubleshooting'))

app.listen(PORT, ()=>{console.log(`server is running on https://localhost/${PORT}/dashboard`)})
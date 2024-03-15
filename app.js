
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
app.use('/dashboard/haradware' , require('./routes/haradware'))
app.use('/dashboard/troubleshooting' , require('./routes/troubleshootin.js'))
app.use('/dashboard/security' , require('./routes/securtiy'))
app.use('/dashboard/protocols' , require('./routes/protocols'))

app.listen(PORT, ()=>{console.log(`server is running on https://localhost/${PORT}/dashboard`)})
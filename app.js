
//to require the data from env cause its secret
const dotenv = require('dotenv')
const cookie = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const connectdb = require('./config/db.js')

dotenv.config()

//connecting mongodb
connectdb()

//importing
const express = require ('express')


//initialization
const app = express()
const PORT = 3000 || process.env.PORT

//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 
app.use(cookie())

//session
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
    store  : mongoStore.create({
        mongoUrl: process.env.MongoURI
    })
}))

//routes
app.use('/welcome' , require('./routes/intro'))
app.use('/dashboard' , require('./routes/board'))
app.use('/dashboard/hardware' , require('./routes/hardware'))
app.use('/dashboard/troubleshooting' , require('./routes/troubleshooting.js'))
app.use('/dashboard/security' , require('./routes/security'))
app.use('/dashboard/protocols' , require('./routes/protocols'))

app.listen(PORT, ()=>{console.log(`server is running on http://localhost/${PORT}/dashboard`)})
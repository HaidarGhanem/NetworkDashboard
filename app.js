require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
// const session = require("express-session");
const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

//Mongo
connectDB();

//configs
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(bodyParser.json());


//ejs layout config
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine' , 'ejs');

app.use('/' , require('./server/routes/main'));
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})
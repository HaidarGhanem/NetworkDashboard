require('dotenv').config()
const data = require('../devices.json')
const express= require ('express')
const router = express.Router()

//impporting the troublshooting controller
const {Connectivity, Configurations , Interfaces , DHCP ,InterfacesStatus} = require ('../controllers/troubleshooting')

//-------------------------------------the troubleshooting functionality-----------------------------------

//functionallity of checking connectivity
router.get('/connectivity', async (req, res) => {
    try {
        // Call the function that fetches data from the Python script
        const { first_ip , second_ip} = req.body
        const result = await Connectivity( first_ip , second_ip , process.env.username , process.env.password)
        res.json(result) // Return the result JSON response
    }
    catch (e) {
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

//checking configurations
router.get('/chekckconfig', async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {ip} = req.body
        const result = await Configurations(ip , process.env.username , process.env.password)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

//check interfaces
router.get('/interfaces', async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {ip } = req.body
        const result = await Interfaces(ip , process.env.username , process.env.password)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

//interfaces status
router.get('/interfacStatus', async (req, res) => {
    try {
        // Call the function that fetches data from the Python script
        const { ip , interface , action} = req.body
        const result = await InterfacesStatus( ip , process.env.username , process.env.password , interface , action)
        res.json(result) // Return the result JSON response
    }
    catch (e) {
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

//DHCP functionallity
router.get('/DHCP' , async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {ip , interfaces , networks} = req.body
        const result = await DHCP(ip , interfaces , networks)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }  
})

module.exports = router
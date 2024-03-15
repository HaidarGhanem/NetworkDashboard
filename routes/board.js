require('dotenv').config()
const data = require('../devices.json')
const express= require ('express')
const router = express.Router()

//impporting the board controller
const {basicGNS , basicInfo , basicInterfaces , basicConnectivity} = require ('../controllers/board')

//-------------------------------------the dashboard functionality-----------------------------------

//fetch the basic data from the GNS3
router.get('/basic', async (req, res) => {
    try {
        // Call the function that fetches data from the Python script
        const result = await basicGNS()
        res.json(result) // Return the result JSON response
    }
    catch (e) {
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

//fetch the basic hardware info for the dashboard for the first device
router.get('/basicInfo', async (req,res)=>{
    try {
        // Call the function that fetches data from the Python script
        const resultHardware = await basicInfo('192.168.192.132','admin','admin')
        const resultInterfaces = await basicInterfaces('192.168.192.132','admin','admin')
        res.json(resultHardware) // Return the result JSON response
        res.json(resultInterfaces) // Return the result JSON response
    }
    catch (e) {
        console.log(e);
        res.status(500).send("An error occurred") // Return an error response
    }
})

//return and input for checkConnectivity section
router.get('/basicConnectivity', async (req,res)=>{
    try {
        // Call the function that fetches data from the Python script
        const {first_ip , second_ip} = req.body
        const resultConnectivity = await basicConnectivity(first_ip , second_ip , process.env.username , process.env.password)
        res.json(resultConnectivity) // Return the result JSON response
    }
    catch (e) {
        console.log(e);
        res.status(500).send("An error occurred") // Return an error response
    }
})


module.exports = router
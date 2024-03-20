require('dotenv').config()
const express= require ('express')
const router = express.Router()


//impporting the board controller
const {basicGNS , basicInfo , basicInterfaces , basicConnectivity} = require ('../controllers/board')
const {Configurations} = require('../controllers/troubleshooting')

//-------------------------------------the dashboard functionality-----------------------------------

//fetch the basic data from the GNS3
//----------------------------------
//----------- GET /basic -----------
//----------------------------------
router.get('/basic', async (req, res) => {
    try {
        const result = await basicGNS()
        res.json(result)
    }
    catch (e) {
        console.log(e)
        res.status(500).send("An error occurred") 
    }
})

//fetch the basic hardware info for the dashboard for the first device
//----------------------------------
//--------- GET /basicInfo ---------
//----------------------------------
router.get('/basicInfo', async (req,res)=>{
    try {
        const resultHardware = await basicInfo('192.168.192.131','admin','admin')
        res.json(resultHardware)
        console.log(resultHardware)

        const resultInterfaces = await basicInterfaces('192.168.192.131','admin','admin')
        res.json(resultInterfaces)
        console.log(resultInterfaces)
    }
    catch (e) {
        console.log(e);
        res.status(500).send("An error occurred") 
    }
})

//return and input for checkConnectivity section
//----------------------------------
//----- GET /basicConnectivity -----
//----------------------------------
router.get('/basicConnectivity', async (req,res)=>{
    try {
        const {src_ip , dst_ip} = req.body
        const resultConnectivity = await basicConnectivity(src_ip , dst_ip , process.env.username , process.env.password)
        console.log(resultConnectivity)
        res.json(resultConnectivity) 
    }
    catch (e) {
        console.log(e);
        res.status(500).send("An error occurred") 
    }
})


module.exports = router
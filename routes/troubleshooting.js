require('dotenv').config()
const data = require('../devices.json')
const express= require ('express')
const router = express.Router()

const {Connectivity, Configurations , Interfaces , DHCP ,InterfacesStatus} = require ('../controllers/troubleshooting')

//-------------------------------------the troubleshooting functionality-----------------------------------

//functionallity of checking connectivity
//----------------------------------
// GET troubleshooting/connectivity 
//----------------------------------
router.get('/connectivity', async (req, res) => {
    try {
        const { src_ip , dst_ip} = req.body
        const result = await Connectivity( src_ip , dst_ip , process.env.username , process.env.password )
        res.json(result) 
        console.log(result)
    }
    catch (e) {
        console.log(e)
        res.status(500).send("An error occurred")
    }
})

//checking configurations
//----------------------------------
// GET troubleshooting/checkconfig 
//----------------------------------
router.get('/checkconfig', async (req,res)=>{
    try{
        const {ip} = req.body
        const result = await Configurations( ip , process.env.username , process.env.password )
        res.json(result)
        console.log(result) 
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred")
    }
})

//check interfaces
//----------------------------------
// GET troubleshooting/interfaces -- 
//----------------------------------
router.get('/interfaces', async (req,res)=>{
    try{
        const {ip } = req.body
        const result = await Interfaces( ip , process.env.username , process.env.password )
        console.log(result) 
        res.json(result)
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred")
    }
})

//interfaces status
//----------------------------------
// GET troubleshooting/interfaceStatus
//----------------------------------
router.get('/interfaceStatus', async (req, res) => {
    try {
        const { ip , interface , action} = req.body
        const result = await InterfacesStatus( ip , process.env.username , process.env.password , interface , action)
        console.log(result) 
        res.json(result)
    }
    catch (e) {
        console.log(e)
        res.status(500).send("An error occurred") 
    }
})

//DHCP functionallity
//----------------------------------
// GET troubleshooting/dhcp
//----------------------------------
router.get('/dhcp' , async (req,res)=>{
    try{
        const {ip , interfaces , networks} = req.body
        const result = await DHCP(ip , interfaces , networks)
        console.log(result)
        res.json(result)
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred")
    }  
})

module.exports = router
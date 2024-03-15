require('dotenv').config()
const data = require('../devices.json')
const express= require('express')
const router = express.Router()
const {Accesses , ApplySecurity , ConfigAudit} = require('../controllers/security')

//---------------------------------- Security Panel -------------------------------

router.get('/access', async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {router_ip , allowed_ips, banned_ips} = req.body
        const result = await Accesses(router_ip, process.env.username , process.env.password , process.env.enablepass , allowed_ips, banned_ips)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

router.get('/configaudit', async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {router_ip} = req.body
        const result = await ConfigAudit(router_ip, process.env.username , process.env.password , process.env.enablepass)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

router.get('/applysecurity', async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {router_ip} = req.body
        const result = await ApplySecurity(router_ip, process.env.username , process.env.password , process.env.enablepass)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

module.exports = router
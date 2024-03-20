require('dotenv').config()
const data = require('../devices.json')
const express= require('express')
const router = express.Router()
const {Accesses , ApplySecurity , ConfigAudit} = require('../controllers/security')

//---------------------------------- Security Panel -------------------------------

//IPs accesses functionality
//----------------------------------
//------ GET security/access -------
//----------------------------------
router.get('/access', async (req,res)=>{
    try{
        const {router_ip , allowed_ips, banned_ips} = req.body
        const result = await Accesses(router_ip, process.env.username , process.env.password , allowed_ips, banned_ips)
        console.log(result)
        res.json(result)
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") 
    }
})

//Configurations audit functionality
//----------------------------------
//---- GET security/configaudit ----
//----------------------------------
router.get('/configaudit', async (req,res)=>{
    try{
        const {router_ip} = req.body
        const result = await ConfigAudit(router_ip, process.env.username , process.env.password)
        console.log(result)
        res.json(result)
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred")
    }
})

//apply the standard security
//----------------------------------
//--- GET security/applysecurity ---
//----------------------------------
router.get('/applysecurity', async (req,res)=>{
    try{
        const {router_ip} = req.body
        const result = await ApplySecurity(router_ip, process.env.username , process.env.password )
        console.log(result)
        res.json(result)
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred")
    }
})

module.exports = router
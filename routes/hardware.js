require('dotenv').config()
const data = require('../devices.json')
const express= require('express')
const router = express.Router()
const {Info} = require('../controllers/hardware')


//----------------------------------------Hardware Panel-----------------------------------
router.get('/info' , async (req,res)=>{
    try {
        // Call the function that fetches data from the Python script
        const {router_ip} = req.body
        const result = await Info(router_ip, process.env.username , process.env.password)
        res.json(result) // Return the result JSON response
    }
    catch (e) {
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

module.exports = router
require('dotenv').config()
const express = require('express')
const router = express.Router()
const Info  = require('../controllers/hardware')
const { authMiddleware } = require ('../config/jwt')

//----------------------------------------Hardware Panel-----------------------------------


//fetch the hardware info for devices
//----------------------------------
//------- GET /hardware/info -------
//----------------------------------
router.get('/info',authMiddleware, async (req, res) => {
    try {
        const {ip} = req.body
        const result = await Info( ip , process.env.username , process.env.password)
        console.log(result)
        res.json(result)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ error: "An error occurred" })
    }
})

module.exports = router
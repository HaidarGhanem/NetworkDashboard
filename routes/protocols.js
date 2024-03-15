require('dotenv').config()
const data = require('../devices.json')
const express= require ('express')
const router = express.Router()

//impporting the troublshooting controller
const {Interfaces , DHCP , RIP1 ,RIP2 , EIGRP , OSPF , InterfacesStatus} = require ('../controllers/protocols')

//-------------------------------------the Security functionality-----------------------------------

//functionallity of checking interfaces
router.get('/interfaces', async (req, res) => {
    try {
        // Call the function that fetches data from the Python script
        const {ip} = req.body
        const result = await Interfaces(ip ,process.env.username , process.env.password)
        res.json(result) // Return the result JSON response
    }
    catch (e) {
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

//RIP functionallity
router.get('/RIP' , async (req,res)=>{
    const {version} = req.body
    if(version === '1'){
    try{
        // Call the function that fetches data from the Python script
        const {ip , networks} = req.body
        const result = await RIP1(ip , process.env.username , process.env.password , networks)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }}
    else{
        try{
            // Call the function that fetches data from the Python script
            const {ip , networks} = req.body
            const result = await RIP2(ip , process.env.username , process.env.password , networks)
            res.json(result) // Return the result JSON response
        }
        catch(e){
            console.log(e)
            res.status(500).send("An error occurred") // Return an error response
        }
    }
})

//disable RIP functionallity
router.get('/RIPdisable' , async (req,res)=>{
    const {version} = req.body
    if(version === '1'){
    try{
        // Call the function that fetches data from the Python script
        const {ip} = req.body
        const result = await RIP1(ip , process.env.username , process.env.password)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }}
    else{
        try{
            // Call the function that fetches data from the Python script
            const {ip} = req.body
            const result = await RIP2(ip , process.env.username , process.env.password)
            res.json(result) // Return the result JSON response
        }
        catch(e){
            console.log(e)
            res.status(500).send("An error occurred") // Return an error response
        }
    }
})

//EGRIP functionallity
router.get('/EIGRP' , async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {ip , networks , as_number} = req.body
        const result = await EIGRP(ip , process.env.username , process.env.password , networks , as_number)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

//disable EGRIP functionallity
router.get('/EIGRPdisable' , async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {ip , networks , as_number} = req.body
        const result = await EIGRP(ip , process.env.username , process.env.password , as_number)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

//OSPF functionallity
router.get('/OSPF' , async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {ip , networks, interface, area} = req.body
        const result = await OSPF(ip , process.env.username , process.env.password , networks , interface, area)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

//disable OSPF functionallity
router.get('/OSPFdisable' , async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {ip} = req.body
        const result = await OSPF(ip , process.env.username , process.env.password)
        res.json(result) // Return the result JSON response
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

module.exports = router
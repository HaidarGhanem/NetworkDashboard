require('dotenv').config()
const express= require ('express')
const router = express.Router()

const {Interfaces , DHCP , RIP1 ,RIP2 , EIGRP , OSPF , InterfacesStatus} = require ('../controllers/protocols')

//-------------------------------------the Security functionality-----------------------------------

//functionality of checking interfaces
//----------------------------------
//--- GET protocols/interfaces -----
//----------------------------------
router.get('/interfaces', async (req, res) => {
    try {
        const {ip} = req.body
        const result = await Interfaces(ip ,process.env.username , process.env.password)
        res.json(result) 
    }
    catch (e) {
        console.log(e)
        res.status(500).send("An error occurred") 
    }
})

//functionality of interfaces status
//----------------------------------
//- GET protocols/interfacesStatus -
//----------------------------------
router.get('/interfacesStatus', async (req, res) => {
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

//DHCP functionality
//----------------------------------
//------- GET protocols/dhcp -------
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

//RIP functionality
//----------------------------------
//------- GET protocols/rip --------
//----------------------------------
router.get('/rip' , async (req,res)=>{
    const {version} = req.body
    if(version === '1'){
        try{
            const {ip , networks} = req.body
            const result = await RIP1(ip , process.env.username , process.env.password , networks)
            console.log(result)
            res.json(result)
        }
        catch(e){
            console.log(e)
            res.status(500).send("An error occurred")
        }
    }
    else{
        try{
            const {ip , networks} = req.body
            const result = await RIP2(ip , process.env.username , process.env.password , networks)
            console.log(result)
            res.json(result)
        }
        catch(e){
            console.log(e)
            res.status(500).send("An error occurred")
        }
    }
})

//disable RIP functionality
//----------------------------------
//----- GET protocols/ripdis -------
//----------------------------------
router.get('/ripdis' , async (req,res)=>{
    const {version} = req.body
    if(version === '1'){
        try{
            const {ip} = req.body
            const result = await RIP1(ip , process.env.username , process.env.password)
            console.log(result)
            res.json(result)
        }
        catch(e){
            console.log(e)
            res.status(500).send("An error occurred")
        }
    }
    else{
        try{
            const {ip} = req.body
            const result = await RIP2(ip , process.env.username , process.env.password)
            console.log(result)
            res.json(result)
        }
        catch(e){
            console.log(e)
            res.status(500).send("An error occurred")
        }
    }
})

//EGRIP functionality
//----------------------------------
//----- GET protocols/eigrp --------
//----------------------------------
router.get('/EIGRP' , async (req,res)=>{
    try{
        // Call the function that fetches data from the Python script
        const {ip , networks , as_number} = req.body
        const result = await EIGRP( ip , process.env.username , process.env.password , networks , as_number )
        console.log(result)
        res.json(result)
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred")
    }
})

//disable EGRIP functionality
//----------------------------------
//---- GET protocols/eigrpdis ------
//----------------------------------
router.get('/eigrpdis' , async (req,res)=>{
    try{
        const {ip , as_number} = req.body
        const result = await EIGRP(ip , process.env.username , process.env.password , as_number)
        console.log(result)
        res.json(result)
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred")
    }
})

//OSPF functionality
//----------------------------------
//------ GET protocols/ospf --------
//----------------------------------
router.get('/ospf' , async (req,res)=>{
    try{
        const {ip , networks, interface, area} = req.body
        const result = await OSPF(ip , process.env.username , process.env.password , networks , interface, area)
        console.log(result)
        res.json(result) 
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred")
    }
})

//disable OSPF functionality
//----------------------------------
//----- GET protocols/ospfdis ------
//----------------------------------
router.get('/ospfdis' , async (req,res)=>{
    try{
        const {ip} = req.body
        const result = await OSPF(ip , process.env.username , process.env.password)
        console.log(result)
        res.json(result) 
    }
    catch(e){
        console.log(e)
        res.status(500).send("An error occurred")
    }
})

module.exports = router
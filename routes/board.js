const express= require ('express')
const router = express.Router()

//impporting the board controller
const {basicGNS , basicInfo , basicInterfaces , basicConnectivity} = require ('../controllers/board')

//-------------------------------------the dashboard functionality-----------------------------------

//fetch the basic data from the GNS3
router.get('/basic', (req, res) => {
    try {
        // Call the function that fetches data from the Python script
        const result = basicGNS()
        res.json(result) // Return the result JSON response
    }
    catch (e) {
        console.log(e)
        res.status(500).send("An error occurred") // Return an error response
    }
})

//fetch the basic hardware info for the dashboard for the first device
router.get('/basicInfo', (req,res)=>{
    try {
        // Call the function that fetches data from the Python script
        const resultHardware = basicInfo('192.168.192.132','admin','admin')
        const resultInterfaces = basicInterfaces('192.168.192.132','admin','admin')
        res.json(resultHardware) // Return the result JSON response
        res.json(resultInterfaces) // Return the result JSON response
    }
    catch (e) {
        console.log(e);
        res.status(500).send("An error occurred") // Return an error response
    }
})

//return and input for checkConnectivity section
router.get('/basicConnectivity', (req,res)=>{
    try {
        // Call the function that fetches data from the Python script
        const {first_ip , second_ip , username , password} = req.body
        const resultConnectivity = basicConnectivity(first_ip , second_ip , username , password)
        res.json(resultConnectivity) // Return the result JSON response
    }
    catch (e) {
        console.log(e);
        res.status(500).send("An error occurred") // Return an error response
    }
})


module.exports = router
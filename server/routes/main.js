const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send('Server Is Working Correctly :) ');
})

module.exports = router;
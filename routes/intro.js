const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');


router.post('/register', async(req,res)=>{
    try{

        console.log(req.body);
        const{username,password,repeatPassword} = req.body;

        if(repeatPassword === password){

        const hashedpassword = await bcrypt.hash(password,10);

        try{
            const user = await User.create({username , password : hashedpassword });
            res.status(201)
        }

        catch(error){

            if (error.code === 11000){
                res.status(409).json({message : 'user alreadey in use'})
                                     }
            res.status(500).json({message: 'internal server error'});
        }
                                        }
        else{
            console.log("passwords don't match");
            }
        }
    catch(error){
        console.log(error); 
                }
    })

    //--------------------------------------------------------

router.get('/login', async (req, res) => {
    const {username,password} = req.body;
    
        try{
            const user = await User.findOne({username});
    
            if(!user){
                console.log('user is not exists');
            }
    
            const isPassword = await bcrypt.compare(password , user.password);
    
            if(!isPassword){
                console.log('invalid password try again');
            }
    
            else{
                const token = jwt.sign({ userId : user._id } , jwtsecret );
                res.cookie('token',token,{httpOnly:true});
                req.session.user = {
                username : user.username
            }
                res.redirect('/main/board');
            }
    
        }
        
        catch(err){
            console.log(err)
        }
})

   
//--------------------------------------------------------
module.exports = router;
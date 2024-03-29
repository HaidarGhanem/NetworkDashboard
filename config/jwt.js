const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWT_SECRET;

//auth middleware

const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token,jwtsecret);
        req.userId = decoded.userId;
        next();
    }catch(error){
        console.log(error);
        }
}

module.exports = authMiddleware
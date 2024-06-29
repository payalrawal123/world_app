require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async(req,res, next)=>{
    const accessToken = req.headers.authorization;
  
    try {
        
        var decoded = jwt.verify(accessToken,process.env.SECRET_KEY  )
        if(decoded){
         req.body.user = decoded
            next();
        }
    } catch (error) {
        console.error(error.message);
        return res.send(error.message)
    }
}
module.exports = {
    verifyToken
}
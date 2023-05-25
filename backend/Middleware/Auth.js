const jwt = require("jsonwebtoken");
require("dotenv").config();
const Auth=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.send("please login again");
    }
    const token=req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.secret,function(err,decode){
        if(err){
            res.send("pls login");
        }
        else{
            req.body.email=decode.email;
            next();
        }
    })

}

module.exports={
        Auth
}
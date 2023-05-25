const mongoose=require('mongoose');
require('dotenv').config()
const connectDB=()=>{
    try {
        mongoose.connect(process.env.DATABASE);
        console.log("db connected")
    }
     catch (error) {
        console.log("db.js",error)
    }   
}
module.exports={
    connectDB
}
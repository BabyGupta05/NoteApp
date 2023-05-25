const express=require('express');
const {userRoute}=require('./Route/user.routes')
const {noteRoute}=require('./Route/note.routes')
const { Auth}=require('./Middleware/Auth')
const cors=require('cors')
require('dotenv').config();
const {connectDB}=require('./db');
const app=express();
app.use(express.json());
app.use(cors());
connectDB();
const port=8080
app.get('/',(req,res)=>{
    res.status(200).send("home page");
})
app.use('/user',userRoute);
app.use( Auth);
app.use('/note',noteRoute);
app.listen(port,()=>{
    console.log("server started")
})
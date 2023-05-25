const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fname:{required:true,type:String},
    lname:{required:true,type:String},
    email:{required:true,type:String,unique:true},
    password:{required:true,type:String}
})

const userModel=mongoose.model("user",userSchema);

module.exports={
    userModel
}
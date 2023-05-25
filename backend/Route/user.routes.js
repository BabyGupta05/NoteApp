const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRoute = Router();
const { userModel } = require("./../model/user.model");

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.status(500).send({ message: err });
    }
    if (result) {
      const token = jwt.sign({ email: user.email }, process.env.secret);
      res.status(200).send({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        token: token,
      });
      console.log("login success")
    } else {
      res.status(500).send({ message: err });
    }
    
  });
});

userRoute.post("/signup", async(req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if(user){
       return res.status(400).send({ message: "Email already exists" });
    }
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
       
        console.log(err);
        return res.status(500).send({ message: "Inetrenal server error" });
      }
      if (hash) {
        const newUser = await userModel({
          fname,
          lname,
          email,
          password: hash,
        });
        await newUser.save();
        return res.status(200).send("user has registered");
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      console.log(err);
      return res.status(400).send({ message: "Email already exists" });
    } else {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
});
module.exports = {
  userRoute,
};

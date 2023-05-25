const { Router } = require("express");
const noteRoute = Router();
const { noteModel } = require("./../model/notes.model");

noteRoute.get("/", async (req, res) => {
  try {
    const note = await noteModel.find({ email: req.body.email });
    res.status(200).send({notes:note});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
noteRoute.post("/create", async (req, res) => {
  try {
    const{date,heading,note,email}=req.body;
    const newNote=await noteModel({date,heading,note,email});
    await newNote.save();
    res.status(200).send({message:"note created!"});
  } catch (error) {
    res.status(500).send("Internal Server Error");

  }
});
noteRoute.delete("/delete/:noteId", async (req, res) => {
    try {
     const {noteId}=req.params;
     const email=req.body.email;
     const deleteNote= await noteModel.deleteOne({_id:noteId,email:email});
     if(deleteNote)
     {
        return res.status(200).send({message:"delete successful","note":deleteNote});
     }else{
        return res.status(500).send({message:"delete failed"});
     }
   
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  });
noteRoute.patch("/edit/:noteId", async (req, res) => {
    try {
     const {noteId}=req.params;
     const email=req.body.email;
     const filter ={_id:noteId,email:email};
     const update = {heading:req.body.heading,note:req.body.note};
     const updateNote= await noteModel.findOneAndUpdate(filter,update);
     if(updateNote)
     {
        return res.status(200).send({message:"update successful","note":updateNote});
     }else{
        return res.status(500).send({message:"update failed"});
     }
    
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  });

module.exports = {
  noteRoute,
};

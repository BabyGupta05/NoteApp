const mongoose =require('mongoose');
const noteSchema=new mongoose.Schema({
    date: {
        type: Date,
        required: true
      },
      heading: {
        type: String,
        required: true
      },
      note: {
        type: String,
        required: true
      },
      email:{
        type:String,
        required:true
      }
})

const noteModel=mongoose.model('note',noteSchema);
module.exports={
    noteModel
}
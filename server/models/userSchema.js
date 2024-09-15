const mongoose=require('mongoose');

const userSchema=({
  username:{
    type:String,
    required:true,
    min:5,
    max:20,
    lowercase:true,
    trim:true                           //to remove the space at the beginning
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    index:true                       //for mongodb to automatically index it
  },
  password:{
    type:String,
    required:true,
    unique:true,
    min:8,
    max:25
  }
})
 
const user = mongoose.model('User', userSchema);          //A collection named User (mongodb default-Users) will be made here
module.exports = user;
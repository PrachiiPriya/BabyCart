const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (request, response) => {
  try {
    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response.status(409).json({ message: "Username already exists" });
    }
    const user = request.body;
    const newUser = new User(user);
    await newUser.save();
    response.status(200).json({ message: "User created successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}); 

router.post('/login',async (request,response)=>{
  try {
  const email=request.body.email;
  const password=request.body.password;

  let user=await User.findOne({email:email, password: password});
  if(user){
    return response.status(200).json({data:user});
  }else{
    return response.status(401).json('Invalid login.');
  }
  } catch (error) {
    response.status(500).json('Error',error.message);
  }
});


module.exports = router;

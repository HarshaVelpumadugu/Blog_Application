// routes/auth.js
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try{
    if(!email ||!password){
        return res.status(400).json({error:"All fields are required"});
    }
    const ExistingUser=await User.findOne({email});
    if(ExistingUser){
        return res.status(400).json({error:"email already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newuser = await User.create({ email, password: hashedPassword });
    await newuser.save();
    const token = jwt.sign({ id: newuser._id,email:newuser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({token});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id,email:user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token });
  }
  catch(err){
    res.status(500).json({error:"Internal server error"});
  }
  
});

router.post('/logout',async(req,res)=>{    
    res.status(200).json({message:"Logged Out Successfully"});
});

module.exports = router;

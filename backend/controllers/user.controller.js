const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    
    await newUser.save();

    
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);

    return res.status(201).json({
      message: 'User created successfully',
      user: { name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const GetAllUsers=async(req,res)=>{
  try{
    const users=await User.find().populate('savedRecipes')
    res.status(200).json(users)

  }catch(err){
    res.status(500).json({error:err.message})

  }
}

const GetUserById=async(req,res)=>{
  try {
    const user = await User.findById(req.params.id).populate('savedRecipes');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}
module.exports={createUser,GetAllUsers,GetUserById}

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

    
    const token = generateToken(data);


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
const generateToken = (data) => {
  const token = jwt.sign(
    { name: data.Name, email: data.email, id: data.id },
    process.env.SECRET_KEY
  );
  return token;
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const CheckUserPresentinDB = await User.findOne({ email: email });
    if (CheckUserPresentinDB) {
      return res.status(403).send({ message: "User aldready present" });
    }
    
    bcrypt.hash(password, 10, async function (err, hash) {
      try {
        if (err) {
          console.log(hash, err);
          return res
            .status(403)
            .send({ message: "Please enter the password.." });
        }
        console.log(hash, "Password", password);
        await User.create({
          name: name,
          email,
          password: hash,
        });
        
        return res.status(201).send({ message: "User created successfully.." });
      } catch (er) {
        return res.status(500).send({ message: er.message });
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  try {
    const CheckUserPresentinDB = await User.findOne({ email: email });
    bcrypt.compare(
      password,
      CheckUserPresentinDB.password,
      function (err, result) {
        if (err) {
          return res.status(403).send({ message: er.message });
        }
        let data = {
          id: CheckUserPresentinDB._id,
          email,
          password: CheckUserPresentinDB.password,
        };
        const token = generateToken(data);
        return res.status(200).cookie("token", token).send({
          message: "User logged in successfully",
          success: true,
          token,
        });
      }
    );
  } catch (er) {
    return res.status(403).send({ message: er.message, success: false });
  }
};

const GetAllUsers=async(req,res)=>{
  try{
    const users=await User.find()
    res.status(200).json(users)

  }catch(err){
    res.status(500).json({error:err.message})

  }
}

const GetUserById=async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

const UpdateUser=async(req,res)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}
module.exports={createUser,GetAllUsers,GetUserById,UpdateUser,signup,login}

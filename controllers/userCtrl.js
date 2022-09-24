const Users=require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userCtrl = {
  register:async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email })
      if (user) {
        return res.status(400).json({
          msg: 'User already exists'
        })
      }
      if (password.length < 6) { 
        return res.status(400).json({
          msg: 'Password should be at least 6 characters long'
        })
      }
      //PASSWORD ENCRYPTION
      const passwordHash=await bcrypt.hash(password,10);

      const newUser = await Users({
        name, email, password: passwordHash
      })
      // save user to database
      await newUser.save();
      // create json web token for user authentication
      
      const accesstoken=createAccessToken({id:newUser._id});
      const refreshtoken = createRefreshToken({ id: newUser._id });
      res.cookie('refreshtoken', refreshtoken, { httpOnly: true, path: '/user/refresh_token' });

      res.json({accesstoken});
     // res.json({msg:"User created successfully"});
    }
    catch (err) {
      res.status(500).json({msg:err.message});
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(400).json({msg:" incorrect password"});
      }
      //if login is successful create json web token for user authentication
        const accesstoken = createAccessToken({ id: user._id });
        const refreshtoken = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/user/refresh_token",
        });

        res.json({ accesstoken });
    }
    catch (err) {
      res.status(500).json({msg:err.message});
    }
  },
  logout: async (req, res) => { 
    try {
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
      res.json({msg:"Logged out successfully"});
    }
     
    catch (err) {
      res.status(500).json({msg:err.message});
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      }
      res.json(user);
    
      }
    catch (err) {
      res.status(500).json({msg:err.message});
    }
  },
  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        res.status(400).json({msg:"please login or register"});
      }
      jwt.verify(rf_token, process.env.REFREH_TOKEN_SECRET, (err, user) => { 
        if (err) {
          res.status(401).json({msg:"please login or register"});
        }
        const accesstoken = createAccessToken({id:user.id});
        res.json({accesstoken});
      })
    }
    catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFREH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
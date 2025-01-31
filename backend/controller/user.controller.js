const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

const createToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      role: user.role
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: "30d" }
  );
};

const registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.array()
    });
  }

  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Username, email, and password are required." 
    });
  }

  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ 
        success: false, 
        message: "User with this email already exists." 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user' // Only allow admin role if explicitly specified
    });

    const user = await newUser.save();
    if (!user) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create user." 
      });
    }

    const token = createToken(user);
    return res.status(201).json({ 
      success: true, 
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      message: "User registered successfully." 
    });

  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: err.message 
    });
  }
};

const loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: "Validation failed",
      errors: error.array()
    });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Email and password are required." 
    });
  }

  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "User not found." 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid password." 
      });
    }

    const token = createToken(user);
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: err.message 
    });
  }
};

module.exports = { registerUser, loginUser };

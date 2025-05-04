const { User, validateUser, validateUsers } = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const {Token} = require("../models/Token");
const crypto = require("crypto");

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

const registerUser = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({ ...req.body, password: hashPassword });
    await user.save();

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    await token.save();

    res.status(200).send({ message: "User Registered Successfully" });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const authToken = user.generateAuthToken();
    res.status(200).send({ data: authToken, role: user.role, message: "Logged in successfully" });

  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({ ...req.body, password: hashPassword });
    await user.save();

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await token.save();

    res.status(200).send({ message: "User Added Successfully" });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { error } = validateUsers(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).send({ message: "User not found!" });

    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email role');
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('name email role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
};

const getTotalUser = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'user' });
    res.status(200).json({ totalStudents: count });
  } catch (error) {
    console.error("Error counting students:", error);
    res.status(500).json({ message: 'Failed to get total students', error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    // Optional: Validate input here

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('name email');

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedProfile
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Failed to update user', error });
  }
};


const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('name email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addUser,
  updateUser,
  updateProfile,
  deleteUser,
  getProfile,
  getUserById,
  getAllUsers,
  getTotalUser
}
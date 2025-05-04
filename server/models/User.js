const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Generate JWT Token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

// Compare hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

// Validation for Registration
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[A-Za-z\s'-]{2,}$/)
      .required()
      .label("Name")
      .messages({
        'string.pattern.base': 'Name must contain only letters, spaces, apostrophes, or hyphens, and be at least 2 characters long.',
        'string.empty': 'Name is required.',
      }),
    email: Joi.string()
      .email()
      .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@gmail\\.com$"))
      .required()
      .label("Email")
      .messages({
        "string.pattern.base": "Email must be a valid Gmail address.",
      }),
    password: passwordComplexity().required().label("Password"),
    role: Joi.string().required().label("Role"),
  });
  return schema.validate(data);
};

const validateUsers = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[A-Za-z\s'-]{2,}$/)
      .required()
      .label("Name")
      .messages({
        'string.pattern.base': 'Name must contain only letters, spaces, apostrophes, or hyphens, and be at least 2 characters long.',
        'string.empty': 'Name is required.',
      }),
    email: Joi.string()
      .email()
      .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@gmail\\.com$"))
      .required()
      .label("Email")
      .messages({
        "string.pattern.base": "Email must be a valid Gmail address.",
      }),
    
    role: Joi.string().required().label("Role"),
  });
  return schema.validate(data);
};


module.exports = {
  User,
  validateUser,
  validateUsers
};

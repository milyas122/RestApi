const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userValidation = require("../validations/userValidation");

async function getAllUser(req, res, next) {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users found" });
  }
  return res.status(200).json({ users });
}

async function signup(req, res, next) {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    await userValidation.userSignupSchema.validate(req.body);
    existingUser = await User.findOne({ email });
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).json({ message: e.errors[0] });
    }
    return console.log(e);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const user = User({ name, email, password: hashPassword, blogs: [] });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  return res.status(200).json({ message: "Login Successfully" });
}
module.exports = { getAllUser, signup, login };

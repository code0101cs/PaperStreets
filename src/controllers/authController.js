const bcrypt = require("bcrypt");
const User = require("../models/user");

const getSignupPage = (req, res) => {
  res.render("signup");
};

const getLoginPage = (req, res) => {
  res.render("login");
};

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.redirect("/login");
  } catch (error) {
    console.log("Signup Error:", error);
    res.send("Signup failed");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Invalid email or password");
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.log("Login Error:", error);
    res.send("Login failed");
  }
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = {
  getSignupPage,
  getLoginPage,
  signupUser,
  loginUser,
  logoutUser
};
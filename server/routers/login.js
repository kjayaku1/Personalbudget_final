const LoginRouter = require("express").Router();
const moment = require("moment");
const jwt = require("jsonwebtoken");
const User = require("../models/register.model");
const errorMessages = require("../utils/validationErrMsg");
const requireLogin = require("../middleware/requireLogin");

const secret = process.env.JWT_SECRET || 'qwertyuiopasdfghjklzxcvbnm1234567890';
const expires = process.env.JWT_EXPIRES_IN || '5m';

LoginRouter.post("/", async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "email not registered" });
    else if (!user.validUser)
      return res.status(400).json({ message: "user is not registered" });
    if (user.password !== password)
      return res.status(400).json({ message: "password incorrect" });

    const token = await jwt.sign({ _id: user._id }, secret, {
      expiresIn: expires,
    });

    User.updateOne(
      { _id: user._id },
      { $push: { loginedInTime: moment().utc() } }
    ).exec();


    // console.log(token);
    let userRole;
    switch (user.userType) {
      case 0:
        userRole = "user";
        break;
      case 1:
        userRole = "admin";
        break;
      case 2:
        userRole = "super_admin";
        break;
      default:
        userRole = "user";
        break;
    }
    res.status(200).json({
      message: "You are successfully logged in",
      user_id: user._id,
      userName: user.username,
      access_token: token,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: errorMessages(error) });
  }
});

LoginRouter.get("/", requireLogin, async (req, res) => {
  res.send("Hello, world!");
});

module.exports = LoginRouter;

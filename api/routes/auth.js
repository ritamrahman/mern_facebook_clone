const router = require("express").Router();
const User = require("../modules/User");
const bcrypt = require("bcryptjs");

// Register
// http://localhost:8000/api/auth/register
// @username
// @email
// @password
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const users = await newUser.save();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
// http://localhost:8000/api/auth/login
// @email
// @password
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong Credential!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong Credential!");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;

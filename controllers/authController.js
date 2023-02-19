const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email And Password are require " });
    } else {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET
      );

      res.status(201).json({ user, token });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "Email not found" });
    }

    const Match = await user.checkPassword(req.body.password);
    if (!Match) {
      res.status(404).json({ message: "Email not found" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

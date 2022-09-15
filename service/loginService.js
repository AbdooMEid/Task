const bcrypt = require("bcryptjs");
const userModel = require("../model/user.schema");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(201).json("email , password can not be empty");
    }
    const user = await userModel.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user._id, email: user.email, name: user.name },
          process.env.JWT_SECRET
        );
        res.status(200).header("token", token).json({
          message: "login successful",
          data: user._id,
        });
      } else {
        res.status(201).json({ message: "password incorrect" });
      }
    } else {
      res.status(201).json({ message: "user is not found" });
    }
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = login;

const bcrypt = require("bcryptjs");
const userModel = require("../model/user.schema");
const _ = require("lodash");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const error = validationResult(req);
    let user = await userModel.findOne({ email });
    const names = await userModel.findOne({ name });
    if (error.isEmpty() === true) {
      if (user) {
        return res.status(201).json({ message: "Email Is Already Exists" });
      }
      if (names) {
        return res
          .status(201)
          .json({ message: "name is already exists please change name" });
      }
      if (password !== confirmPassword) {
        return res
          .status(201)
          .json({ message: "confirm Password do not match password" });
      }
      let images = req.files.imgUrl;
      let imagePath = [];
      let type = [];
      let finalPath = [];
      if (images !== undefined) {
        for (let i = 0; images.length > i; i++) {
          imagePath.push(images[i].path);
          type.push(images[i].mimetype);
        }
      }

      for (let k = 0; type.length > k; k++) {
        if (
          type[k] == "image/png" ||
          type[k] == "image/jpeg" ||
          type[k] == "image/jpg" ||
          type[k] == "image/webp"
        ) {
          finalPath.push(imagePath[k]);
        } else {
          return res.status(201).json("failed Upload type png/jpeg/jpg");
        }
      }
      user = new userModel({
        name,
        email,
        password,
        confirmPassword,
        imgUrl: finalPath[0],
      });
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      res.status(200).json(_.pick(user, ["_id", "name", "email", "imgUrl"]));
    } else {
      res.status(201).json(error.array());
    }
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = register;

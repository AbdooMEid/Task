const userModel = require("../model/user.schema");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    const error = validationResult(req);
    if (error.isEmpty() === true) {
      let user = await userModel.findById(req.id);
      if (!user) {
        return res.status(201).json("user not found");
      }
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        return res.status(201).json("incorrect password");
      }
      if (newPassword !== confirmPassword) {
        return res.status(201).json("confirm Password do not match password");
      }
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      let password = await bcrypt.hash(newPassword, salt);
      await userModel
        .findByIdAndUpdate(req.id, {
          password: password,
        })
        .then((doc) => res.status(200).json("updated password"))
        .catch((err) => res.status(400).json(err));
    } else {
      res.status(201).json(error.array());
    }
  } catch (error) {
    res.status(201).json(error.message);
  }
};

const updateName = async (req, res) => {
  try {
    const { name } = req.body;
    const names = await userModel.findOne({ name });
    if (!names) {
      await userModel
        .findByIdAndUpdate(req.id, {
          name,
        })
        .then((doc) => res.status(200).json("updated Name"))
        .catch((err) => res.status(400).json(err));
    } else {
      return res.status(201).json("name is already exists please change name");
    }
  } catch (error) {
    res.status(201).json(error.message);
  }
};

const updateImage = async (req, res) => {
  try {
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
        throw new Error("failed Upload");
      }
    }
    await userModel
      .findByIdAndUpdate(req.id, { imgUrl: finalPath[0] })
      .then((doc) => {
        res.status(200).json("updated Image");
      })
      .catch((err) => console.error(err));
  } catch (error) {
    res.status(201).json(error.message);
  }
};
module.exports = { updatePassword, updateName, updateImage };

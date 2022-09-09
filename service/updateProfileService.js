const userModel = require("../model/user.schema");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + Math.random() * 1000 + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  )
    cb(null, true);
  else cb(null, false);
};
const upload = multer({
  dest: "public/img",
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});
const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    let user = await userModel.findById(req.id);
    if (!user) {
      return res.status(201).json("user not found");
    }
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(201).json("incorrect password");
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(201)
        .json({ message: "confirm Password do not match password" });
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
      return res
        .status(201)
        .json({ message: "name is already exists please change name" });
    }
  } catch (error) {
    res.status(201).json(error.message);
  }
};

const updateImage = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(201).json("reject file because accept jpeg or png  ");
    }
    await userModel
      .findByIdAndUpdate(req.id, { imgUrl: req.file.path })
      .then((doc) => {
        res.status(200).json("updated Image");
      })
      .catch((err) => console.error(err));
  } catch (error) {
    res.status(201).json(error.message);
  }
};
module.exports = { updatePassword, updateName, upload, updateImage };

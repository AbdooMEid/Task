const router = require("express").Router();
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const userModel = require("../model/user.schema");
const _ = require("lodash");
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
router.post(
  "/register",
  upload.single("imgUrl"),
  check("name").matches(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/),
  check("email").isEmail(),
  check("password").matches(/^(?=.*[A-Z]).{8,}$/),
  check("confirmPassword").matches(/^(?=.*[A-Z]).{8,}$/),
  async (req, res) => {
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
        if (req.file === undefined) {
          return res
            .status(201)
            .json("reject file because accept jpeg or png  ");
        }
        user = new userModel({
          name,
          email,
          password,
          confirmPassword,
          imgUrl: req.file.path,
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
  }
);

module.exports = router;

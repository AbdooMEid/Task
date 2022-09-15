const router = require("express").Router();
const { check } = require("express-validator");
const register = require("../service/registerService");
const uploadFiles = require("../config/uploadImage");
router.route("/register").post(
  uploadFiles,
  check("name").matches(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/),
  check("email").isEmail(),
  check("password").matches(/^(?=.*[A-Z]).{8,}$/),
  check("confirmPassword").matches(/^(?=.*[A-Z]).{8,}$/),
  register
);

module.exports = router;

const router = require("express").Router();
const auth = require("../auth/auth");
const {
  updatePassword,
  updateName,
  updateImage,
} = require("../service/updateProfileService");
const { check } = require("express-validator");
const uploadFiles = require("../config/uploadImage");

/*
method => put 
/editPassword
/editName
/editImage
imgUrl
oldPassword, newPassword, confirmPassword 
name
response => updatePassword
response => updateName
response => updateImage
*/
router.route("/editPassword").put(auth, updatePassword);
router.route("/editName").put(auth, updateName);
router
  .route("/editImage")
  .put(
    auth,
    uploadFiles,
    check("newPassword").matches(/^(?=.*[A-Z]).{8,}$/),
    check("confirmPassword").matches(/^(?=.*[A-Z]).{8,}$/),
    updateImage
  );

module.exports = router;

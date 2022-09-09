const router = require("express").Router();
const auth = require("../auth/auth");
const profile = require("../service/getProfileService");

/*
method => get 
response => {
  _id: ,
  name: '',
  email: '',
  createdAt: ,
  updatedAt: ,
  __v: 0
}
/profile
*/
router.route("/profile").get(auth, profile);

module.exports = router;

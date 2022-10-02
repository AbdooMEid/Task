const router = require("express").Router();
const admin = require("../auth/admin");
const auth = require("../auth/auth");
const contactUs = require("../service/getContactUs");
router.route("/getContactUs").get(auth, admin,contactUs);
module.exports = router;

/*
method => get
endPoint => /getContactUs
*/
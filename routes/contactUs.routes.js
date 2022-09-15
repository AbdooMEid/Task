const router = require("express").Router();
const auth = require("../auth/auth");
const contactUs = require("../service/contactUsService");

router.route("/contact").post(auth, contactUs);

module.exports = router;

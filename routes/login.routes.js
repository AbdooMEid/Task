const router = require("express").Router();
const login = require("../service/loginService");

router.route("/login").post(login);

module.exports = router;

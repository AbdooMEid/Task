const router = require("express").Router();
const auth = require("../auth/auth");
const addAccess = require("../service/accessService");
/*
addAccess
method => post
response => "doneAccess"
    { _id, _idList } = req.body;
    /addAccess
    */
router.route("/addAccess").post(auth, addAccess);

module.exports = router;

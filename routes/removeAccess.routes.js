const router = require("express").Router();
const auth = require("../auth/auth");
const removeAccess = require("../service/removeAccessService");
/*
remove access
method => post
response => "deleted"
{ _id, _idList } = req.body;
/removeAccess
*/
router.route("/removeAccess").post(auth, removeAccess);

module.exports = router;

const router = require("express").Router();
const auth = require("../auth/auth");
const getAccess = require("../service/getAccessService");

/*
method => get
response => [
    
]
/getAccessList
*/
router.route("/getAccessList").get(auth, getAccess);
module.exports = router;

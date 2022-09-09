const router = require("express").Router();
const auth = require("../auth/auth");
const getListAccess = require("../service/getListAccessService");
/*
response => [
    
]
method => get 
{ _idList } = req.query;
end point => /getAccess
*/

router.route("/getAccess").get(auth, getListAccess);
module.exports = router;

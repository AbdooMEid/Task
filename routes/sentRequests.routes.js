const router = require("express").Router();
const auth = require("../auth/auth");
const sentRequest = require("../service/sentRequestService");
router.route("/sentRequests").get(auth, sentRequest);
module.exports = router;

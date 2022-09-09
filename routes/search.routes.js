const router = require("express").Router();
const auth = require("../auth/auth");
const searchFriend = require("../service/searchService");
router.route("/search").post(auth, searchFriend);
module.exports = router;

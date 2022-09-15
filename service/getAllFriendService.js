const userModel = require("../model/user.schema");

const getAllFriend = async (req, res) => {
  try {
    let names = [];
    const Friends = await userModel.findById(req.id);
    for (let i = 0; Friends.friends.length > i; i++) {
      const user = await userModel.findById(Friends.friends[i]._id);
      const name = user.name;
      names.push({ name, _id: Friends.friends[i]._id });
    }
    res.status(200).json(names);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = getAllFriend;

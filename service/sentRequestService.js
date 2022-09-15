const userModel = require("../model/user.schema");

const sentRequest = async (req, res) => {
  try {
    let names = [];
    const sentRequests = await userModel.findById(req.id);
    for (let i = 0; sentRequests.sentRequests.length > i; i++) {
      const user = await userModel.findById(sentRequests.sentRequests[i]._id);
      const name = user.name;
      names.push({ name, _id: sentRequests.sentRequests[i]._id });
    }
    res.status(200).json(names);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = sentRequest;

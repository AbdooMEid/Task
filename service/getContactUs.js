const contactModel = require("../model/contactUs.model");

const contactUs = async (req, res) => {
  try {
    const contact = await contactModel.find({});
    res.status(200).json(contact);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = contactUs;

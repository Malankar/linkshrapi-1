const User = require("../models/User");

async function getUser(req, res) {
  try {
    const { id } = req.query;
    const getUser = await User.findById(id);
    if (getUser) {
      res.status(200).json({ user: getUser });
    } else {
      res.status(404).json({ msg: "Wrong ID" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    const data = await user.save();
    res.json(data);
  } catch (err) {
    res.json({ msg: err });
  }
}
async function forgotPass(req, res) {
  try {
    const getUser = await User.find({ email: req.query.email });
    if (getUser) {
      res.status(200).json({ data: getUser });
    } else {
      res.status(404).json({ msg: "Wrong Email" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}

module.exports = { createUser, getUser, forgotPass };

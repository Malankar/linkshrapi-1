const User = require("../models/User");
async function loginUser(req, res) {
  try {
    const getUser = await User.find({ email: req.body.email });
    if (getUser) {
      if (req.body.password == getUser[0].password) {
        res.status(200).json({ user: getUser[0] });
      } else {
        res.status(203).json({ msg: "Wrong Password" });
      }
    } else {
      res.status(404).json({ msg: "User Not found" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}
async function signUp(req, res) {
  try {
    const getUser = await User.find({ email: req.body.email });
    if (getUser.length == 0) {
      const user = await User.create(req.body);
      res.json({ user: user });
    } else {
      res.status(409).json({ msg: "User Already Exists" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}
module.exports = { loginUser, signUp };

const express = require("express");
const { createUser, getUser,forgotPass } = require("../controllers/user");
const router = express.Router();
router.get("/", getUser).post("/", createUser);
router.get("/forgotpass", forgotPass);
module.exports = router;

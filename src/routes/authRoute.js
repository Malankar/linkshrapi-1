const express = require("express");
const { loginUser, signUp } = require("../controllers/auth");
const router = express.Router();
router.post("/login", loginUser);
router.post("/", signUp);
module.exports = router;

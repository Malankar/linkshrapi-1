const express = require("express");
const {
  addLink,
  deleteLink,
  updateLink,
  getTitle,
} = require("../controllers/link");
const router = express.Router();
router.post("/:id", addLink).delete("/", deleteLink);
router.get("/title", getTitle);
router.patch("/", updateLink);
module.exports = router;

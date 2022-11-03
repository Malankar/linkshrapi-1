const express = require("express");
const {
  addGroup,
  deleteGroup,
  getGroupsByUser,
  cloneGroup,
  editTitle,
  getClonedGrp,
  removeClonedGrp,
  getGroup,
} = require("../controllers/group");
const router = express.Router();
router.post("/", addGroup);
router.get("/", getGroup);
router.post("/title", editTitle);
router
  .get("/clone", getClonedGrp)
  .post("/clone", cloneGroup)
  .delete("/clone/:id", removeClonedGrp);
router.get("/:id", getGroupsByUser).delete("/:id", deleteGroup);
module.exports = router;

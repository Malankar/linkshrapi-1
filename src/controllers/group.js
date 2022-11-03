const User = require("../models/User");
const Group = require("../models/Group");

//Create a group if it does not exists
async function addGroup(req, res) {
  try {
    const getGroup = await Group.find({ createdBy: req.body.createdBy });
    const data = getGroup.filter((data) => data.name == req.body.name);
    const getUser = await User.findById(req.body.createdBy);
    if (getUser) {
      if (data.length == 0) {
        const group = await Group.create(req.body);
        getUser.createdGroups.push(group._id);
        getUser.save();
        res.status(200).json({ group, user: getUser });
      } else {
        res.status(409).json({ msg: "Aleardy Exists" });
      }
    } else {
      res.json({ msg: "User Not found" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}
//Deletes a group if that group exists
async function deleteGroup(req, res) {
  try {
    const groupId = req.params.id;
    const group = await Group.findByIdAndDelete(groupId);
    if (group) {
      const userId = group.createdBy;
      const user = await User.findById(userId);
      let createdGroups = user.createdGroups;
      let index = createdGroups.indexOf(groupId);
      user.createdGroups.splice(index, 1);
      user.save();
      res.json({ group, user });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}

//Get Groups by User
async function getGroupsByUser(req, res) {
  try {
    const getUser = await User.findById(req.params.id).populate([
      { path: "createdGroups" },
      { path: "forkedGroups" },
    ]);
    if (getUser) {
      const groupByUser = getUser.createdGroups;
      const forkedByUser = getUser.forkedGroups;
      res.status(200).json({ groupByUser, forkedByUser });
    } else {
      res.status(409).json({ msg: "Wrong ID" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}
async function cloneGroup(req, res) {
  try {
    const getGroup = await Group.find({ createdBy: req.body.createdBy });
    const data = getGroup.filter((data) => data.name == req.body.name);
    const getUser = await User.findById(req.body.createdBy);
    const forked = getUser.forkedGroups.includes(req.query.id);
    if (!forked) {
      if (data.length == 0) {
        const group = await Group.create(req.body);
        getUser.createdGroups.push(group._id);
        getUser.forkedGroups.push(req.query.id);
        getUser.save();
        res.status(200).json({ group, user: getUser });
      } else {
        res.status(409).json({ msg: "Already Exists" });
      }
    } else {
      res.status(409).json({ msg: "Already Cloned" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}

//edit title
async function editTitle(req, res) {
  try {
    const getGroup = await Group.findById(req.body.id);
    const group = await Group.find({ name: req.body.name });
    if (group[0]?.createdBy !== req.body.createdBy) {
      getGroup.name = req.body.name;
      getGroup.save();
      res.status(200).json({ group: getGroup });
    } else {
      res.status(409).json({ msg: "Group name already in use" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}

async function getClonedGrp(req, res) {
  try {
    const getUser = await User.findById(req.query.id);
    if (getUser) {
      const groupByUser = await Group.find({ _id: getUser.createdGroups });
      const forkedByUser = await Group.find({ _id: getUser.forkedGroups });
      res.status(200).json({ groupByUser, forkedByUser });
    } else {
      res.status(409).json({ msg: "Wrong ID" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
}
async function removeClonedGrp(req, res) {
  try {
    const groupId = req.query.groupId;
    const userId = req.params.id;
    const user = await User.findById(userId);
    let forkedGroups = user.forkedGroups;
    let index = forkedGroups.indexOf(groupId);
    user.forkedGroups.splice(index, 1);
    user.save();
    res.json({ group, user });
  } catch (err) {
    res.json({ msg: err });
  }
}
async function getGroup(req, res) {
  try {
    const group = await Group.findById(req.query.id);
    res.status(200).json({ data: group });
  } catch (err) {
    res.json({ msg: err });
  }
}

module.exports = {
  addGroup,
  deleteGroup,
  getGroupsByUser,
  cloneGroup,
  editTitle,
  getClonedGrp,
  removeClonedGrp,
  getGroup,
};

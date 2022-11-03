const Group = require("../models/Group");
const urlMetadata = require("url-metadata");
//Create a link if the name and link are not there in the group
async function addLink(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const data = group.links.filter(
      (data) => data.link == req.body.link || data.title == req.body.title
    );
    if (data.length === 0 && group !== null) {
      group?.links.push(req.body);
      group.save();
      res.status(200).json({ group });
    } else {
      res.status(409).json("This Link exists in that group");
    }
  } catch (err) {
    res.json({ msg: err });
  }
}

//Deletes a Link in the group
async function deleteLink(req, res) {
  try {
    Group.findByIdAndUpdate(
      req.query.groupId,
      { $pull: { links: { _id: req.query.linkId } } },
      function (err, model) {
        if (err) {
          return res.send(err);
        }
        return res.json(model);
      }
    );
  } catch (err) {
    res.json({ msg: err });
  }
}
//get title
async function getTitle(req, res) {
  try {
    const data = await urlMetadata(req.query.url);
    res.status(200).json({ title: data.title, source: data.source });
  } catch (err) {
    res.json({ msg: err });
  }
}
//Update Links in a group
async function updateLink(req, res) {
  try {
    Group.updateOne(
      { "links._id": req.body.id },
      {
        $set: {
          "links.$.title": req.body.title,
          "links.$.link": req.body.link,
          name: req.body.name,
        },
      },
      function (err, model) {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.status(200).json(model);
        }
      }
    );
  } catch (err) {
    res.json({ msg: err });
  }
}

module.exports = { addLink, deleteLink, updateLink, getTitle };

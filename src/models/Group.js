const mongoose = require("mongoose");
const { Schema } = mongoose;
const GroupSchema = Schema(
  {
    name: { type: String, required: true },
    links: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Group", GroupSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdGroups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    forkedGroups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

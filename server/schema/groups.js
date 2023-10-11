const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const GroupSchema = new mongoose.Schema({
    members:[],
   message: [{  }],
  grpName:String,
  grpPic:String,
  grpDesc:String,
    timestamps:   String}
);

module.exports = mongoose.model("Group", GroupSchema);
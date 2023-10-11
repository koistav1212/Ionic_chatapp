const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const ConversationSchema = new mongoose.Schema({
    members:{},
   message: [{
    
  }],
    timestamps:   String}
);

module.exports = mongoose.model("Conversation", ConversationSchema);
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  _id:String,
  userName: String,
  emailId: { type: String, unique: true},
  password: String,
  profilePic: String,
  about:String,
  timestamps: String,
  isActive:{type:Boolean,default:true},
  rooms:[],
  conversations:[],
  connections:[]

});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// >> Compare Password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);

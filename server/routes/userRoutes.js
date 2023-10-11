const { userLogin, createUser, allUsers,updateUser,getUserbyID,updateconnectionsUser } = require("../controller/user-controller");

let route= require("express").Router();
route.post("/user-login",userLogin);
route.post("/addUsers", createUser);
route.post("/geAlltUsers", allUsers);

route.get("/getUserbyID/:id", getUserbyID);
route.post("/updateUserbyID/:id", updateUser);
route.post("/updateUserconnections/:id",updateconnectionsUser );
module.exports = route;
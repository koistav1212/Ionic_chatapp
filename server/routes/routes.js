const { newConversation, getConversation } = require("../controller/conversation-controller");
const { newMessage, getMessages } = require("../controller/message-controller");
const { newGroup,getGroups,getgrpMessages,addMember,removeMember, grpMsg } = require("../controller/group-controller");
let route= require("express").Router();


route.post("/conversation/add", newConversation);
route.post("/conversation/get", getConversation);

route.post("/message/add", newMessage);
route.get("/message/get/:id", getMessages);
route.post("/group/create",newGroup);
route.post("/group/getall",getGroups);

route.post("/group/addgrpmsg",grpMsg);
route.post("/group/getmsg",getgrpMessages);
route.post("/group/add",addMember);
route.post("/group/remove",removeMember);

module.exports = route;
const mongoose=require("mongoose")

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    receiverId: {
        type: String
        
    },
    text: {
        type: String
    },
    type: {
        type: String
    }
,
timestamps:String
});

module.exports = mongoose.model("Message", MessageSchema);
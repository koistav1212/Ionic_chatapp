const Conversation = require("../schema/Conversation");
const Message = require("../schema/Message");

exports.newMessage = async (request, response) => {
    try {
        
        const conversation = await Conversation.findOne({ _id: request.body.conversationId })
        if(conversation)
       {// console.log(conversation);
        let prvMsg=[]
        if(conversation)
         prvMsg=conversation.message;
        prvMsg.push(request.body)
        await Conversation.findByIdAndUpdate(request.body.conversationId,{message:prvMsg})
        return response.status(200).json(prvMsg);}
        else{
            
        return response.status(500).json("Conv Not found");
        }
    } catch (error) {
        return response.status(500).json(error.message);
    }
}


exports.getMessages = async (request, response) => {
    try {

        const messages = await Conversation.findOne({ _id: request.params.id });
        //console.log(conversationId);
        //console.log(messages);
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}
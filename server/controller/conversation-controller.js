const Conversation = require("../schema/Conversation");


exports.newConversation = async (request, response)=>{
    
        const senderId = request.body.senderId;
        const reciverId = request.body.reciverId;

            
        const newConversation = new Conversation({
            members: {senderId:senderId, reciverId:reciverId,
                
            },
            timestamps:Date.now()
        })

       // newConversation.save();
        const converstion=await newConversation.save();
       // console.log(response)
        response.status(200).json({
            success: true,
            user: "user",
            converstion
        })
    

}

exports.getConversation =async(request, response) =>{
    try {

  //      const senderId = request.body.senderId;
//        const reciverId = request.body.reciverId;
        let conversation = await Conversation.find({_id:{$all:request.body.conversations}})
       // console.log(conversation)
        return response.status(200).json(conversation);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}
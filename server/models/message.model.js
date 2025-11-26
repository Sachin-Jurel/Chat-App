import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {type: Date, default: Date.now}
},
{
    timestamps: true,
})

const Message = mongoose.model("message", messageSchema);

export default Message;
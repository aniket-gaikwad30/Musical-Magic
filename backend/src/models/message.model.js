import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: string,
      required: true,
    },
    senderID: {
      type: string,
      required: true,
    },
    receiverID: {
      type: string,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);

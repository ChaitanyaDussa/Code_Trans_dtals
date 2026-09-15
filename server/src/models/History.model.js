import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    type: {
      type: String,
      enum: {
        values: ["translate", "analyze", "optimize", "explain"],
        message: "{VALUE} is not a valid action type",
      },
      required: [true, "Action type is required"],
    },
    inputCode: {
      type: String,
      required: [true, "Input code is required"],
    },
    sourceLanguage: {
      type: String,
      default: "",
    },
    targetLanguage: {
      type: String,
      default: "",
    },
    output: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Output is required"],
    },
  },
  {
    timestamps: true,
  },
);

const History = mongoose.model("History", historySchema);

export default History;

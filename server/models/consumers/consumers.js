const { Schema, model } = require("mongoose");
const ConsumersSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      index: true,
    },
    mobileNumber: {
      type: Number,
      unique: true,
    },
    emailId: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePhoto: String,
  },
  { versionKey: false }
);
export default model("consumers", ConsumersSchema);

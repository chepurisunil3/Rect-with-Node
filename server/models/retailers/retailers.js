const { Schema, model } = require("mongoose");
const RetailersSchema = new Schema(
  {
    companyName: {
      required: true,
      type: String,
      index: true,
    },
    contactNumber: {
      type: Number,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    contactName: {
      type: String,
      required: true,
    },
    gstNumber: String,
    panNumber: String,
    companyLogo: {
      type: String,
      default: "default-1631444762694.png",
    },
  },
  { versionKey: false }
);
RetailersSchema.methods.getUserReadableData = function () {
  return {
    id: this._id,
    email: this.email,
    contactName: this.contactName,
    contactNumber: this.contactNumber,
    companyName: this.companyName,
  };
};
module.exports = model("retailers", RetailersSchema);

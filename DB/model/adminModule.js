import mongoose, { model, Schema } from "mongoose";

const adminSchema = new Schema({
  userName: { type: String },
  password: { type: String },
});

const adminModel = mongoose.models.User || model("Admin", adminSchema);

export default adminModel;

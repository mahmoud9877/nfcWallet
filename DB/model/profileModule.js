import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String },
    gmail: { type: String },
    phone: { type: String },
    address: { type: String },
    profilePhoto: { type: String },
    coverImage: { type: String },
    message: { type: String },
    facebook: { type: String },
    whatsapp: { type: Number },
    telda: { type: String },
    instagram: { type: String },
    messenger: { type: String },
    pinterest: { type: String },
    zoom: { type: String },
    paypal: { type: String },
    tiktok: { type: String },
    linkedin: { type: String },
    instapay: { type: String },
    youtube: { type: String },
    snapchat: { type: String },
    personalWebsite: { type: String },
    password: { type: String },
    imageGallery: [{ type: String }],
  },
  {
    timestamps: true, // إضافة تاريخ الإنشاء والتعديل
  }
);

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;

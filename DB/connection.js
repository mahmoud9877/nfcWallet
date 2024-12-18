import mongoose from "mongoose";

const connectDB = async () => {
  // Set strictQuery option
  mongoose.set("strictQuery", true); // or false based on your preference
  try {
    await mongoose.connect("mongodb://localhost:27017/nfc_wallet");
    console.log("DB connected successfully");
  } catch (error) {
    console.error(`DB not connected: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

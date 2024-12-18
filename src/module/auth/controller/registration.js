import adminModel from "../../../../DB/model/adminModule.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { generateToken } from "../../../utils/generateToken.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  const checkUser = await adminModel.findOne({ userName });
  if (checkUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = await adminModel.create({
    userName,
    password,
    role: "user", // تأكد من وجود قيمة افتراضية لدور المستخدم
  });

  const token = generateToken({ id: user._id, role: user.role }, "30d");

  return res.status(201).json({
    message: "Signup successful",
    userId: user._id,
    token,
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  const user = await adminModel.findOne({ userName: userName.toLowerCase() });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const token = generateToken({ id: user._id, role: user.role }, "30d");

  return res.status(200).json({
    message: "Login successful",
    token,
  });
});

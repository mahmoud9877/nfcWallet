import userModel from "../../../../DB/model/profileModule.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import cloudinary from "../../../utils/cloudinary.js";

// Function to get a user's profile based on NFC ID
export const getProfile = asyncHandler(async (req, res) => {
  const { nfcID } = req.params;
  const user = await userModel.findById(nfcID);

  if (!user) {
    return res.status(404).json({ message: "No data found for this NFC ID" });
  }
  res.status(200).json(user);
});

export const getAllWallets = asyncHandler(async (req, res, next) => {
  const getData = await userModel.find();
  return res.json({ message: "Done", getData });
});

export const createWallet = asyncHandler(async (req, res, next) => {
  const create = await userModel.create({
    userName: null,
    gmail: null,
    phone: null,
    address: null,
    message: null,
    facebook: null,
    whatsapp: null,
    instagram: null,
    messenger: null,
    pinterest: null,
    telda: null,
    zoom: null,
    paypal: null,
    tiktok: null,
    linkedin: null,
    instapay: null,
    youtube: null,
    snapchat: null,
    personalWebsite: null,
    password: null,
  });
  return res.json({
    message: `created successfully and your new link is https://profile.solidbrand.net/?id=${create._id}`,
    create,
  });
});

// Function to create a new user profile
export const createProfile = asyncHandler(async (req, res) => {
  const { nfcID } = req.params;
  if (nfcID) {
    const checkID = await userModel.findById(nfcID);
    if (!checkID) {
      return res.status(404).json({ message: "NFC ID not found" });
    }
  }
  let {
    userName,
    gmail,
    phone,
    address,
    facebook,
    whatsapp,
    instagram,
    messenger,
    pinterest,
    telda,
    zoom,
    paypal,
    tiktok,
    linkedin,
    instapay,
    youtube,
    snapchat,
    message,
    personalWebsite,
    password,
    cPassword,
  } = req.body;
  // Check if email or phone already exists
  if (await userModel.findOne({ gmail })) {
    return res.status(400).json({ message: "Gmail is already taken" });
  }
  if (await userModel.findOne({ phone })) {
    return res.status(400).json({ message: "Phone is already taken" });
  }
  // Check passwords match
  if (password !== cPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  if (checkID.password != "") {
    if (checkID.password != password) {
      return res.status(400).json({ message: "password wrong" });
    }
  }

  try {
    // Upload images to Cloudinary
    const profilePhoto = req.files?.profilePhoto?.[0]
      ? await cloudinary.uploader.upload(req.files.profilePhoto[0].path, {
          folder: "profiles",
        })
      : null;

    const coverImage = req.files?.coverImage?.[0]
      ? await cloudinary.uploader.upload(req.files.coverImage[0].path, {
          folder: "covers",
        })
      : null;

    const imageGallery = req.files?.imageGallery
      ? await Promise.all(
          req.files.imageGallery.map((file) =>
            cloudinary.uploader.upload(file.path, { folder: "gallery" })
          )
        )
      : [];

    // Save user to database
    const profile = await userModel.updateOne(
      { _id: nfcID },
      {
        userName,
        gmail,
        phone,
        address,
        facebook,
        whatsapp,
        instagram,
        messenger,
        pinterest,
        telda,
        zoom,
        paypal,
        tiktok,
        linkedin,
        instapay,
        youtube,
        snapchat,
        message,
        personalWebsite,
        profilePhoto: profilePhoto?.secure_url || null,
        coverImage: coverImage?.secure_url || null,
        imageGallery: imageGallery.map((img) => img.secure_url) || [],
        password,
      }
    );

    res.status(200).json({
      message: "done",
      data: profile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export const deleteWallet = asyncHandler(async (req, res) => {
  const { id } = req.params; // الحصول على الـ id من المعاملات (parameters)

  // التحقق من وجود المحفظة
  const wallet = await userModel.findById(id);
  if (!wallet) {
    return res.status(404).json({ message: "Wallet not found" });
  }

  // حذف المحفظة
  await wallet.deleteOne();

  res.status(200).json({ message: "Wallet deleted successfully" });
});

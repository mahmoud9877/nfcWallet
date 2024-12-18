const router = Router();
import { Router } from "express";
import * as profileController from "./controller/profile.js";
import { validateUser } from "../../middleware/validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";

router.get("/", profileController.getAllWallets);
router.get("/:nfcID", profileController.getProfile);
router.post("/", profileController.createWallet);
// Create Profile
router.post(
  "/create/:nfcID",
  fileUpload(fileValidation.image).fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "imageGallery", maxCount: 5 },
  ]),
  validateUser,
  profileController.createProfile
);

router.delete("/wallets/:id",profileController.deleteWallet);




export default router;

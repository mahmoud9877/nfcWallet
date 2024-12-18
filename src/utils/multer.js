import multer from "multer";
export const fileValidation = {
  image: ["image/jpeg", "image/png", "image/gif"],
};
export function fileUpload(customValidation = fileValidation.image) {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("In-valid file format", false);
    }
    console.log(file);
  }
  const upload = multer({ fileFilter, storage: storage });
  
  return upload;
}

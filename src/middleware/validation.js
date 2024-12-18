import Joi from "joi";
// Joi Validation Schema
export const userCreateValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a string.",
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username cannot exceed 30 characters.",
  }),
  gmail: Joi.string().email().required().messages({
    "string.email": "A valid email is required.",
    "string.empty": "Email is required.",
  }),
  message: Joi.string().min(3).max(30),
  phone: Joi.string()
    .pattern(/^(?:\+20|0)?1[0125]\d{8}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must contain only digits.",
      "string.empty": "Phone number is required.",
    }),
  facebook: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Facebook link must be a valid URL.",
  }),
  messenger: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Messenger link must be a valid URL.",
  }),
  whatsapp: Joi.number().allow(null, ""),
  instapay: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Instapay link must be a valid URL.",
  }),
  instagram: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Instagram link must be a valid URL.",
  }),
  tiktok: Joi.string().uri().allow(null, "").messages({
    "string.uri": "TikTok link must be a valid URL.",
  }),
  linkedin: Joi.string().uri().allow(null, "").messages({
    "string.uri": "LinkedIn link must be a valid URL.",
  }),
  youtube: Joi.string().uri().allow(null, "").messages({
    "string.uri": "YouTube link must be a valid URL.",
  }),
  snapchat: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Snapchat link must be a valid URL.",
  }),
  zoom: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Zoom link must be a valid URL.",
  }),
  paypal: Joi.string().uri().allow(null, "").messages({
    "string.uri": "PayPal link must be a valid URL.",
  }),
  telda: Joi.string().uri().allow(null, ""),
  address: Joi.string().optional(),
  profilePhoto: Joi.string().optional(),
  coverImage: Joi.string().optional(),
  personalWebsite: Joi.string().optional().uri(),
  password: Joi.string().required().messages({
    "string.pattern.base":
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
    "string.empty": "Password is required.",
  }),
  cPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match the password.",
    "string.empty": "Confirm password is required.",
  }),
});

export const validateUser = (req, res, next) => {
  console.log(req.body);
  const { error } = userCreateValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ message: "Validation error", errors });
  }
  next();
};

// Joi Validation Schema for Updating a User
export const userUpdateValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(30),
  gmail: Joi.string().email(),
  message: Joi.string().min(3).max(30),
  facebook: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Facebook link must be a valid URL.",
  }),
  messenger: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Messenger link must be a valid URL.",
  }),
  whatsapp: Joi.number().allow(null, ""),
  instapay: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Instapay link must be a valid URL.",
  }),
  instagram: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Instagram link must be a valid URL.",
  }),
  tiktok: Joi.string().uri().allow(null, "").messages({
    "string.uri": "TikTok link must be a valid URL.",
  }),
  linkedin: Joi.string().uri().allow(null, "").messages({
    "string.uri": "LinkedIn link must be a valid URL.",
  }),
  youtube: Joi.string().uri().allow(null, "").messages({
    "string.uri": "YouTube link must be a valid URL.",
  }),
  snapchat: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Snapchat link must be a valid URL.",
  }),
  zoom: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Zoom link must be a valid URL.",
  }),
  paypal: Joi.string().uri().allow(null, "").messages({
    "string.uri": "PayPal link must be a valid URL.",
  }),
  telda: Joi.string().uri().allow(null, ""),
  phone: Joi.string().pattern(/^\d+$/),
  address: Joi.string().optional(),
  profilePhoto: Joi.object().optional(),
  coverImage: Joi.string().optional(),
  personalWebsite: Joi.string().optional().uri(),
  currentPassword: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.empty": "Password is required.",
  }),
  imageGallery: Joi.array().items(Joi.string().uri()).optional(),
});

export const validateUserUpdate = (req, res, next) => {
  const { error } = userUpdateValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ message: "Validation error", errors });
  }
  next();
};

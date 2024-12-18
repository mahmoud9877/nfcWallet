import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
export const signup = joi
  .object({
    userName: joi.string().min(2).max(25).required(),
    email: generalFields.email,
    password: generalFields.password,
    cPassword: generalFields.cPassword,
  })
  .required();

export const token = joi
  .object({
    token: generalFields.email,
  })
  .required();

export const login = joi
  .object({
    email: generalFields.email,
    password: generalFields.password,
  })
  .required();

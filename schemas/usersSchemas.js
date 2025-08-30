import Joi from "joi";

export const signupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

export const signinSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
export const updatePasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required(),
});

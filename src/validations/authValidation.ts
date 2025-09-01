import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export const updatePasswordSchema = z.object({
  newPassword: z.string().min(6),
});

export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;

export const authValidation = {
  register: registerSchema,
  login: loginSchema,
  forgotPassword: forgotPasswordSchema,
  updatePassword: updatePasswordSchema,
};

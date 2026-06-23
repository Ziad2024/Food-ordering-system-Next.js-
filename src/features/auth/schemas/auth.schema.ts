import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('auth.errors.invalid_email'),
  password: z.string().min(6, 'auth.errors.password_min'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'auth.errors.name_min').max(60, 'auth.errors.name_max'),
  email: z.string().email('auth.errors.invalid_email'),
  phone: z.string().min(8, 'auth.errors.phone_min').max(20, 'auth.errors.phone_max'),
  password: z.string().min(6, 'auth.errors.password_min'),
  confirmPassword: z.string().min(6, 'auth.errors.confirm_password_min'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'auth.errors.passwords_mismatch',
  path: ['confirmPassword'],
});

export const verifyOtpSchema = z.object({
  email: z.string().email('auth.errors.invalid_email'),
  otp: z.string().length(6, 'auth.errors.otp_length'),
  deviceIdentifier: z.string().min(1, 'auth.errors.device_id_required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('auth.errors.invalid_email'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'auth.errors.token_required'),
  password: z.string().min(6, 'auth.errors.password_min'),
  confirmPassword: z.string().min(6, 'auth.errors.confirm_password_min'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'auth.errors.passwords_mismatch',
  path: ['confirmPassword'],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

import { axiosClient } from './axiosClient';
import { ApiResponse, User } from '@/types/api.types';
import {
  LoginInput,
  RegisterInput,
  VerifyOtpInput,
  ForgotPasswordInput,
  ResetPasswordInput
} from '@/features/auth/schemas/auth.schema';

export interface OtpResponseData {
  maskedEmail: string;
}

export interface LoginVerifyData {
  accessToken: string;
  user: User;
}

export const authService = {
  async register(data: RegisterInput): Promise<ApiResponse<OtpResponseData>> {
    const res = await axiosClient.post<ApiResponse<OtpResponseData>>('/auth/register', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword
    });
    return res.data;
  },

  async login(data: LoginInput): Promise<ApiResponse<LoginVerifyData>> {
    const res = await axiosClient.post<ApiResponse<LoginVerifyData>>('/auth/login', data);
    return res.data;
  },

  async verifyOtp(data: VerifyOtpInput): Promise<ApiResponse<LoginVerifyData>> {
    const res = await axiosClient.post<ApiResponse<LoginVerifyData>>('/auth/verify-otp', data);
    return res.data;
  },

  async logout(): Promise<ApiResponse<null>> {
    const res = await axiosClient.post<ApiResponse<null>>('/auth/logout');
    return res.data;
  },

  async forgotPassword(data: ForgotPasswordInput): Promise<ApiResponse<null>> {
    const res = await axiosClient.post<ApiResponse<null>>('/auth/forgot-password', data);
    return res.data;
  },

  async resetPassword(data: ResetPasswordInput): Promise<ApiResponse<null>> {
    const res = await axiosClient.post<ApiResponse<null>>('/auth/reset-password', {
      token: data.token,
      password: data.password,
      confirmPassword: data.confirmPassword
    });
    return res.data;
  }
};
export default authService;

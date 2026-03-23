import { createUrl } from "@/utils/functions";


export const API_CONSTANTS = {
  sendOtp: "/v1/auth/send-otp",
  resendOtp: "/v1/auth/resend-otp",
  verifyOtp: "/v1/auth/login-via-otp",
  refreshToken: "/v1/auth/refresh",
  onboardPartners: "/v1/partners",
  getRms: "/v1/partners/gs-rms",
  getPartners: "/v1/partners",
};

import { setCookie } from "@/utils/cookies";
import { storageKeys } from "@/utils/enum";
import axios from "axios";
import { API_CONSTANTS } from "./apiConstants";
import { refreshAccessTokenRequest } from "./authRefresh";
import axiosInstance from "./axiosInstance";
import {
  IOnboardPartners,
  IOnboardStudents,
  IResendOtp,
  ISendOtp,
  IVerifyOtp,
} from "./types";

/** @deprecated Prefer refreshAccessTokenRequest from ./authRefresh */
export const getRefreshAccessToken = async () => {
  return refreshAccessTokenRequest();
};

export const uploadToS3 = async (url: string, data: any, mimeType: string) => {
  const res = await axios.put(url, data, {
    headers: {
      "Content-Type": mimeType,
    },
  });
  return res?.data?.response?.data;
};
// --------------------------------------------------------------------------------------
// ---------------------------------------- Auth ----------------------------------------
// --------------------------------------------------------------------------------------

export const sendOtp = async (payload: ISendOtp) => {
  const res = await axiosInstance().post(API_CONSTANTS.sendOtp, payload);
  return res?.data?.data ?? {};
};

export const verifyOtp = async (payload: IVerifyOtp) => {
  const res = await axiosInstance().post(API_CONSTANTS.verifyOtp, payload);
  return res?.data?.data ?? {};
};

export const resendOtp = async (payload: IResendOtp) => {
  const res = await axiosInstance().post(API_CONSTANTS.resendOtp, payload);
  return res?.data?.data ?? {};
};

/** Manual refresh (e.g. proactive rotation). Does not use axiosInstance to avoid interceptor loops. */
export const refreshToken = async () => {
  const data = await refreshAccessTokenRequest();
  if (data?.accessToken) {
    setCookie(storageKeys.ACCESS_TOKEN, data.accessToken);
    if (data.refreshToken) {
      setCookie(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }
  return data ?? {};
};

// --------------------------------------------------------------------------------------
// -------------------------------------- Partners --------------------------------------
// --------------------------------------------------------------------------------------

export const onboardPartners = async (payload: IOnboardPartners) => {
  const res = await axiosInstance().post(API_CONSTANTS.onboardPartners, payload);
  return res?.data?.data ?? {};
};

export const getPartners = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getPartners);
  return res?.data ?? {};
};

export const getRms = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getRms);
  return res?.data?.data ?? {};
};

// --------------------------------------------------------------------------------------
// -------------------------------------- Students --------------------------------------
// --------------------------------------------------------------------------------------


export const getStudents = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getStudents);
  return res?.data ?? {};
};


export const onboardStudents = async (payload: IOnboardStudents) => {
  const res = await axiosInstance().post(API_CONSTANTS.onboardStudents, payload);
  return res?.data?.data ?? {};
};

export const getStudentPartnerRms = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getStudentPartnerRms);
  return res?.data?.data ?? {};
};

import { setCookie } from "@/utils/cookies";
import { storageKeys } from "@/utils/enum";
import axios from "axios";
import { API_CONSTANTS } from "./apiConstants";
import { refreshAccessTokenRequest } from "./authRefresh";
import axiosInstance from "./axiosInstance";
import {
  IAddProgram,
  IAddUniversity,
  INewApplication,
  IOnboardPartners,
  IOnboardStudents,
  IResendOtp,
  ISendOtp,
  IVerifyOtp,
} from "./types";
import { IUpdateProgram } from "@/features/masterData/programs/types";
import { IUpdateUniversity } from "@/features/masterData/universities/types";
import { ISubmitApplication } from "./types";

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


export const getStudents = async (search?: string) => {
  const res = await axiosInstance().get(API_CONSTANTS.getStudents(search));
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

export const archiveStudent = async (studentId: string) => {
  const res = await axiosInstance().patch(API_CONSTANTS.archiveStudent(studentId));
  return res?.data?.data ?? {};
};

export const activateStudent = async (studentId: string) => {
  const res = await axiosInstance().patch(API_CONSTANTS.activateStudent(studentId));
  return res?.data?.data ?? {};
};
// --------------------------------------------------------------------------------------
// -------------------------------------- Countries -------------------------------------
// --------------------------------------------------------------------------------------

export const getCountries = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getCountries);
  return res?.data?.data ?? {};
};
export const getCountriesStates = async (countryId: string) => {
  const res = await axiosInstance().get(API_CONSTANTS.getCountriesStates(countryId));
  return res?.data?.data ?? {};
};
export const getStateCities = async (stateId: string) => {
  const res = await axiosInstance().get(API_CONSTANTS.getStateCities(stateId));
  return res?.data?.data ?? {};
};
// --------------------------------------------------------------------------------------
// ------------------------------------ Universities ------------------------------------
// --------------------------------------------------------------------------------------

export const getUniversities = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getUniversities);
  return res?.data?.data ?? {};
};

export const addUniversity = async (payload: IAddUniversity) => {
  const res = await axiosInstance().post(API_CONSTANTS.addUniversity, payload);
  return res?.data?.data ?? {};
};

export const updateUniversity = async (universityId: string, payload: IUpdateUniversity) => {
  const res = await axiosInstance().patch(API_CONSTANTS.updateUniversity(universityId), payload);
  return res?.data?.data ?? {};
};

export const removeUniversity = async (universityId: string) => {
  const res = await axiosInstance().delete(API_CONSTANTS.removeUniversity(universityId));
  return res?.data?.data ?? {};
};

// --------------------------------------------------------------------------------------
// -------------------------------------- Programs --------------------------------------
// --------------------------------------------------------------------------------------

export const getPrograms = async (search?: string) => {
  const res = await axiosInstance().get(API_CONSTANTS.getPrograms(search));
  return res?.data?.data ?? {};
};

export const addProgram = async (payload: IAddProgram) => {
  const res = await axiosInstance().post(API_CONSTANTS.addProgram, payload);
  return res?.data?.data ?? {};
};

export const updateProgram = async (programId: string, payload: IUpdateProgram) => {
  const res = await axiosInstance().patch(API_CONSTANTS.updateProgram(programId), payload);
  return res?.data?.data ?? {};
};

export const removeProgram = async (programId: string) => {
  const res = await axiosInstance().delete(API_CONSTANTS.removeProgram(programId));
  return res?.data?.data ?? {};
};

// --------------------------------------------------------------------------------------
// ------------------------------------ Applications ------------------------------------
// --------------------------------------------------------------------------------------

export const createNewApplication = async (payload: INewApplication) => {
  const res = await axiosInstance().post(API_CONSTANTS.createNewApplication, payload);
  return res?.data?.data ?? {};
};

export const getApplications = async (search?: string) => {
  const res = await axiosInstance().get(API_CONSTANTS.getApplications(search));
  return res?.data?.data ?? {};
};

import { createUrl } from "@/utils/functions";


export const API_CONSTANTS = {
  sendOtp: "/v1/auth/send-otp",
  resendOtp: "/v1/auth/resend-otp",
  verifyOtp: "/v1/auth/login-via-otp",
  refreshToken: "/v1/auth/refresh",
  onboardPartners: "/v1/partners",
  getRms: "/v1/partners/gs-rms",
  getPartners: "/v1/partners",
  getStudents: (search?: string) => createUrl(`/v1/students`, { search }),
  onboardStudents: "/v1/students",
  getStudentPartnerRms: "/v1/students/partner-rms",
  newApplication: "/v1/applications",
  getUniversities: "/v1/universities",
  addUniversity: "/v1/universities",
  getCountries: "/v1/location/countries",
  getCountriesStates: (countryId: string) => createUrl(`/v1/location/countries/${countryId}/states`),
  getStateCities: (stateId: string) => createUrl(`/v1/location/states/${stateId}/cities`),
  getPrograms: "/v1/programs",
  addProgram: "/v1/programs",
};

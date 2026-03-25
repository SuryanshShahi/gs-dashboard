import type { StoredFileSnapshot } from "@/utils/fileSnapshot";

export type StoredStudentFile = string | StoredFileSnapshot;

export const STUDENT_COUNTRY_OPTIONS = [
  { label: "India", value: "india" },
  { label: "United States", value: "united_states" },
  { label: "United Kingdom", value: "united_kingdom" },
  { label: "Canada", value: "canada" },
  { label: "Australia", value: "australia" },
  { label: "Other", value: "other" },
] as const;

export function countryLabelFromValue(value: string): string {
  const found = STUDENT_COUNTRY_OPTIONS.find((o) => o.value === value);
  return found?.label ?? value;
}

export interface IStudentPersonalDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  personalEmail: string;
  phone: string;
  whatsapp: string;
  gender: string;
  dateOfBirth: string;
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  profilePhoto: StoredStudentFile;
}

export interface IStudentPassportDetails {
  passportNumber: string;
  passportExpiry: string;
  counsellorId: string;
}

export interface IOnboardingStudentDetails {
  personalDetails: IStudentPersonalDetails;
  passportDetails: IStudentPassportDetails;
}

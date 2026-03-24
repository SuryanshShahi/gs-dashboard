import * as Yup from "yup";
import { storageKeys } from "../enum";
import { isStoredFileSnapshot } from "../fileSnapshot";
import { getLocalItem } from "../localstorage";
import { ErrorMessage, Regex } from "../static";

function hasPersistedStudentProfilePhoto(): boolean {
  const data = getLocalItem<{ personalDetails?: Record<string, unknown> }>(
    storageKeys.STUDENT_ONBOARDING_DETAILS,
  );
  const v = data?.personalDetails?.profilePhoto;
  return (
    (typeof v === "string" && v.trim().length > 0) || isStoredFileSnapshot(v)
  );
}

export const studentPersonalSchema = Yup.object({
  firstName: Yup.string().required(ErrorMessage.REQUIRED),
  middleName: Yup.string(),
  lastName: Yup.string().required(ErrorMessage.REQUIRED),
  personalEmail: Yup.string()
    .email(ErrorMessage.INVALID_EMAIL)
    .required(ErrorMessage.REQUIRED),
  phone: Yup.string()
    .matches(Regex.PHONE, ErrorMessage.INVALID_PHONE)
    .required(ErrorMessage.REQUIRED),
  whatsapp: Yup.string().matches(Regex.PHONE, ErrorMessage.INVALID_PHONE),
  gender: Yup.string().required(ErrorMessage.REQUIRED),
  dateOfBirth: Yup.string().required(ErrorMessage.REQUIRED),
  addressLine1: Yup.string().required(ErrorMessage.REQUIRED),
  country: Yup.string().required(ErrorMessage.REQUIRED),
  state: Yup.string().required(ErrorMessage.REQUIRED),
  city: Yup.string().required(ErrorMessage.REQUIRED),
  pincode: Yup.string()
    .matches(/^[0-9]{5,10}$/, "Please enter a valid pincode")
    .required(ErrorMessage.REQUIRED),
  profilePhoto: Yup.mixed().test(
    "is-file-or-persisted",
    ErrorMessage.REQUIRED,
    (val) => val instanceof File || hasPersistedStudentProfilePhoto(),
  ),
});

export const studentPassportSchema = Yup.object({
  passportNumber: Yup.string().required(ErrorMessage.REQUIRED),
  passportExpiry: Yup.string().required(ErrorMessage.REQUIRED),
  counsellorId: Yup.string().required(ErrorMessage.REQUIRED),
});

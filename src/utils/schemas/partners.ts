import * as Yup from "yup";
import { storageKeys } from "../enum";
import { isStoredFileSnapshot } from "../fileSnapshot";
import { getLocalItem } from "../localstorage";
import { ErrorMessage, Regex } from "../static";

function hasPersistedOverviewFile(
  field: "companyLogo" | "companyLogoSquare",
): boolean {
  const data = getLocalItem<{ overview?: Record<string, unknown> }>(
    storageKeys.PARTNER_ONBOARDING_DETAILS,
  );
  const v = data?.overview?.[field];
  return (
    (typeof v === "string" && v.trim().length > 0) ||
    isStoredFileSnapshot(v)
  );
}

function hasPersistedContractFile(
  field:
    | "serviceAgreement"
    | "nonDisclosureAgreement"
    | "commissionStructure",
): boolean {
  const data = getLocalItem<{ contractDocument?: Record<string, unknown> }>(
    storageKeys.PARTNER_ONBOARDING_DETAILS,
  );
  const v = data?.contractDocument?.[field];
  return (
    (typeof v === "string" && v.trim().length > 0) ||
    isStoredFileSnapshot(v)
  );
}

export const partnersAccountAdminSchema = Yup.object({
  firstName: Yup.string().required(ErrorMessage.REQUIRED),
  middleName: Yup.string(),
  lastName: Yup.string().required(ErrorMessage.REQUIRED),
  adminEmail: Yup.string()
    .email(ErrorMessage.INVALID_EMAIL)
    .required(ErrorMessage.REQUIRED),
  adminPhoneNumber: Yup.string().required(ErrorMessage.REQUIRED),
  designation: Yup.string().required(ErrorMessage.REQUIRED),
  selectRm: Yup.string().required(ErrorMessage.REQUIRED),
});
export const partnersOverviewSchema = Yup.object({
  companyName: Yup.string().required(ErrorMessage.REQUIRED),
  registeredCompanyName: Yup.string(),
  companyType: Yup.string(),
  website: Yup.string().url("Please enter a valid URL"),
  phoneNumber: Yup.string()
    .matches(Regex.PHONE, ErrorMessage.INVALID_PHONE)
    .required(ErrorMessage.REQUIRED),
  email: Yup.string()
    .email(ErrorMessage.INVALID_EMAIL)
    .required(ErrorMessage.REQUIRED),
  companyAddress: Yup.string().required(ErrorMessage.REQUIRED),
  country: Yup.string().required(ErrorMessage.REQUIRED),
  state: Yup.string().required(ErrorMessage.REQUIRED),
  city: Yup.string().required(ErrorMessage.REQUIRED),
  pincode: Yup.string()
    .matches(/^[0-9]{5,10}$/, "Please enter a valid pincode")
    .required(ErrorMessage.REQUIRED),
  companyLogo: Yup.mixed().test(
    "is-file-or-persisted",
    ErrorMessage.REQUIRED,
    (val) => val instanceof File || hasPersistedOverviewFile("companyLogo"),
  ),
  companyLogoSquare: Yup.mixed().test(
    "is-file-or-persisted",
    ErrorMessage.REQUIRED,
    (val) =>
      val instanceof File || hasPersistedOverviewFile("companyLogoSquare"),
  ),
});

export const partnersContractDocumentSchema = Yup.object({
  gstin: Yup.string().required(ErrorMessage.REQUIRED),
  pan: Yup.string()
    .required(ErrorMessage.REQUIRED)
    .length(10, "Please enter a valid PAN"),
  serviceAgreement: Yup.mixed().test(
    "is-file-or-persisted",
    ErrorMessage.REQUIRED,
    (val) => val instanceof File || hasPersistedContractFile("serviceAgreement"),
  ),
  nonDisclosureAgreement: Yup.mixed().test(
    "is-file-or-persisted",
    ErrorMessage.REQUIRED,
    (val) =>
      val instanceof File ||
      hasPersistedContractFile("nonDisclosureAgreement"),
  ),
  commissionStructure: Yup.mixed().test(
    "is-file-or-persisted",
    ErrorMessage.REQUIRED,
    (val) =>
      val instanceof File ||
      hasPersistedContractFile("commissionStructure"),
  ),
  paymentTerms: Yup.string(),
});

export const partnersBankDetailsSchema = Yup.object({
  country: Yup.string().required(ErrorMessage.REQUIRED),
  bankName: Yup.string().required(ErrorMessage.REQUIRED),
  accountNumber: Yup.string().required(ErrorMessage.REQUIRED),
  ifscCode: Yup.string().required(ErrorMessage.REQUIRED),
  swiftBicCode: Yup.string().required(ErrorMessage.REQUIRED),
  sortCode: Yup.string().required(ErrorMessage.REQUIRED),
});

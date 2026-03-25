import type { StoredFileSnapshot } from "@/utils/fileSnapshot";

export type StoredPartnerFile = string | StoredFileSnapshot;

export interface IPartnerOverviewDetails {
  companyName: string;
  country: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  registeredCompanyName: string;
  companyType: string;
  website: string;
  phoneNumber: string;
  email: string;
  companyAddress: string;
  state: string;
  city: string;
  pincode: string;
  companyLogo: StoredPartnerFile;
  companyLogoSquare: StoredPartnerFile;
}

export interface IPartnerContractDocumentDetails {
  gstin: string;
  pan: string;
  serviceAgreement: StoredPartnerFile;
  nonDisclosureAgreement: StoredPartnerFile;
  commissionStructure: StoredPartnerFile;
  paymentTerms: string;
}

export interface IPartnerBankDetails {
  country: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  swiftBicCode: string;
  sortCode: string;
}

export interface IPartnerAccountAdminDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  adminEmail: string;
  adminPhoneNumber: string;
  designation: string;
  selectRm: string;
}

export interface IOnboardingPartnerDetails {
  overview: IPartnerOverviewDetails;
  contractDocument: IPartnerContractDocumentDetails;
  bankDetails: IPartnerBankDetails;
  accountAdmin: IPartnerAccountAdminDetails;
}
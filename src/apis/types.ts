export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface IResendOtp {
  email: string;
}

export interface IOnboardPartners {
  companyName: string;
  country: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  logoUrl: string;
  gstNumber: string;
  panNumber: string;
  documents: {
    docType: string;
    label: string;
    fileUrl: string;
    fileName: string;
    fileSizeBytes: number;
  }[];
  bankDetail: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    ifscCode: string;
    swiftCode: string;
  };
  partnerAdmin: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    designation: string;
  };
  assignedRmId: string;
}
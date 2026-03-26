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

export type StudentOnboardGender = "MALE" | "FEMALE" | "OTHER";

export interface IOnboardStudents {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: StudentOnboardGender;
  nationality: string;
  countryOfResidence: string;
  personalEmail: string;
  phone: string;
  whatsapp: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  education: Record<string, unknown>;
  testScores: Record<string, unknown>;
  profilePhotoUrl: string;
  passportNumber: string;
  passportExpiry: string;
  counsellorId: string;
}

export interface INewApplication {
  studentId: string;
  universityId: string;
  programId: string;
  intakeMonth: number;
  intakeYear: number;
  studyMode: string;
  scholarshipInterest: boolean;
  fundingSource: string;
  partnerNotes: string;
}

export interface IAddUniversity {
  name: string;
  country: string;
  city?: string;
  type?: string;
  qsRanking?: number;
  logoUrl?: string;
  website?: string;
  isActive: boolean;
}

export interface IAddProgram {
  name: string;
  universityId: string;
  level: string;
  studyMode: string;
  duration?: string;
  tuitionFee: string;
  currency: string;
  intakes?: string[];
  isActive: boolean;
}

export interface ISelected {
  label: string;
  value: string;
}
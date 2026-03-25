export interface IStudentResponse {
    data: IStudent[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface IStudentAddress {
    city: string;
    line1: string;
    line2: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface IStudentPartner {
    id: string;
    companyName: string;
    partnerCode: string;
}

export interface IStudentPerson {
    id: string;
    firstName: string;
    lastName: string;
}

export type StudentGender = "MALE" | "FEMALE" | "OTHER" | string;

export type StudentRecordStatus = "ACTIVE" | "INACTIVE" | string;

/** Row from GET /v1/students */
export interface IStudent {
    id: string;
    partnerId: string;
    createdBy: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: StudentGender;
    nationality: string;
    countryOfResidence: string;
    passportNumber: string;
    passportExpiry: string;
    personalEmail: string;
    phone: string;
    whatsapp: string;
    address: IStudentAddress;
    education: Record<string, unknown> | null;
    testScores: Record<string, unknown> | null;
    profilePhotoUrl: string;
    status: StudentRecordStatus;
    counsellorId: string;
    fcmTokens: unknown[];
    createdAt: string;
    updatedAt: string;
    partner: IStudentPartner;
    creator: IStudentPerson;
    counsellor: IStudentPerson;
}

/** One row in the students DataTable (mapped from `IStudent`). */
export interface StudentTableRow {
    id: string;
    name: string;
    email: string;
    contact: string;
    avatar: string;
    counsellor: {
        name: string;
        affiliation: string;
    } | null;
    applications: number;
}


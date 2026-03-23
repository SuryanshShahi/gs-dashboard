export interface IPartnerResponse {
  data: IPartner[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IPartnerAddress {
  city: string;
  line1: string;
  line2: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface IPartnerAssignedRm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface IPartnerCounts {
  users: number;
  students: number;
}

/** Partner row from GET /v1/partners (or equivalent). */
export interface IPartner {
  id: string;
  partnerCode: string;
  companyName: string;
  country: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  address: IPartnerAddress;
  logoUrl: string;
  assignedRmId: string;
  gstNumber: string;
  panNumber: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  assignedRm: IPartnerAssignedRm;
  _count: IPartnerCounts;
}

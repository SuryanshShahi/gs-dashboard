export type UniversityStatus = "ACTIVE" | "INACTIVE";

/** Row for the Universities master data table. */
export interface IUniversity {
  id: string;
  name: string;
  city: {
    id: string;
    name: string;
  };
  country: {
    id: string;
    name: string;
  };
  type: string
  logoUrl: string | null;
  website: string;
  contactEmail: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    programs: number;
    applications: number;
  };
}
export interface UniversityTableRow {
  id: string;
  name: string;
  city: string;
  countryName: string;
  flagEmoji: string;
  type: string;
  qsRanking: number;
  programs: number;
  status: UniversityStatus;
  isActive: boolean;
  website?: string;
}

export interface IUpdateUniversity {
  name?: string;
  country?: number;
  city?: number;
  type?: string;
  qsRanking?: number;
  logoUrl?: string;
  website?: string;
  isActive?: boolean;
}
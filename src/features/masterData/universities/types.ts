export type UniversityStatus = "ACTIVE" | "INACTIVE";

export type UniversityType = "Public" | "Private";

/** Row for the Universities master data table. */
export interface IUniversity {
  id: string;
  name: string;
  city: string;
  country: string;
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
  type: UniversityType;
  qsRanking: number;
  programs: number;
  status: UniversityStatus;
}

export type UniversityStatus = "ACTIVE" | "INACTIVE";

export type UniversityType = "Public" | "Private";

/** Row for the Universities master data table. */
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

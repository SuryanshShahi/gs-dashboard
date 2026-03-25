export type ProgramStatus = "ACTIVE" | "INACTIVE";

export type ProgramCategory =
  | "UNDERGRADUATE"
  | "POSTGRADUATE"
  | "PHD"
  | "DIPLOMA";

/** Row for the Programs master data table. */
export interface ProgramTableRow {
  id: string;
  name: string;
  category: ProgramCategory;
  universityName: string;
  countryName: string;
  flagEmoji: string;
  duration: string;
  studyMode: string;
  intakes: string[];
  tuitionPerYear: string;
  status: ProgramStatus;
}

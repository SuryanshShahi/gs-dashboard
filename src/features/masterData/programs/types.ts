export type ProgramStatus = "ACTIVE" | "INACTIVE";


/** Row for the Programs master data table. */
export interface ProgramTableRow {
  id: string;
  name: string;
  category: string;
  universityName: string;
  countryName: string;
  flagEmoji: string;
  duration: string;
  studyMode: string;
  intakes: string[];
  tuitionPerYear: string;
  status: ProgramStatus;
}


export interface IProgram {
  id: string;
  universityId: string;
  name: string;
  level: string;
  tuitionFee: string;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  university: {
    id: string;
    name: string;
    country: string;
  };
  _count: {
    applications: number;
  };
}
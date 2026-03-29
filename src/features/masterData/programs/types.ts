export type ProgramStatus = "ACTIVE" | "INACTIVE";

export interface IUpdateProgram {
  name?: string;
  universityId?: string;
  level?: string;
  studyMode?: string;
  duration?: string;
  tuitionFee?: string;
  currency?: string;
  intakes?: string[];
  isActive?: boolean;
}

export interface ProgramTableRow {
  id: string;
  universityId: string;
  name: string;
  category: string;
  universityName: string;
  countryName: string;
  flagEmoji: string;
  duration: string;
  studyMode: string;
  intakes: string[];
  tuitionPerYear: string;
  tuitionFee: string;
  currency: string;
  isActive: boolean;
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
  duration?: string;
  studyMode?: string;
  intakes?: string[];
  university: {
    id: string;
    name: string;
    country: {
      id: string;
      name: string;
    };
  };
  _count: {
    applications: number;
  };
}
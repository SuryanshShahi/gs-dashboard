import { ISelected } from "@/apis/types";
import type { StoredFileSnapshot } from "@/utils/fileSnapshot";

export type StoredApplicationFile = string | StoredFileSnapshot;

export interface ApplicationSelectStudent {
  studentId: string;
  studentName: string;
  studentEmail: string;
  countryLabel: string;
}

export interface ApplicationChooseProgram {
  country: ISelected | undefined;
  intake: string;
  university: ISelected | undefined;
  program: ISelected | undefined;
  levelOfStudy: string;
  studyMode: string;
  applicationNotes: string;
}


export interface ApplicationUploadDocuments {
  passportCopy?: StoredApplicationFile;
  academicTranscripts?: StoredApplicationFile;
  englishProficiency?: StoredApplicationFile;
  statementOfPurpose?: StoredApplicationFile;
  referenceLetters?: StoredApplicationFile;
  workExperienceCv?: StoredApplicationFile;
  additionalSupporting?: StoredApplicationFile;
}

export interface IApplicationOnboarding {
  selectStudent?: ApplicationSelectStudent;
  chooseProgram?: ApplicationChooseProgram;
  uploadDocuments?: ApplicationUploadDocuments;
  reviewConfirmed?: boolean;
}

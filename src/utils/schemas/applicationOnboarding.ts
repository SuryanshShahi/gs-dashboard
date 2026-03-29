import * as Yup from "yup";
import { ErrorMessage } from "../static";

export const applicationSelectStudentSchema = Yup.object({
  selectedStudent: Yup.object({
    studentId: Yup.string().required(ErrorMessage.REQUIRED),
    studentName: Yup.string(),
    studentEmail: Yup.string(),
    countryLabel: Yup.string(),
  }).required(ErrorMessage.REQUIRED),
});

const labeledSelectSchema = Yup.object({
  value: Yup.string().required(ErrorMessage.REQUIRED),
  label: Yup.string(),
});

export const applicationChooseProgramSchema = Yup.object({
  country: labeledSelectSchema,
  intake: Yup.string().required(ErrorMessage.REQUIRED),
  university: labeledSelectSchema,
  program: labeledSelectSchema,
  levelOfStudy: Yup.string(),
  studyMode: Yup.string(),
  applicationNotes: Yup.string(),
});

export const applicationUploadDocumentsSchema = Yup.object({
  passportCopy: Yup.mixed().nullable(),
  academicTranscripts: Yup.mixed().nullable(),
  englishProficiency: Yup.mixed().nullable(),
  statementOfPurpose: Yup.mixed().nullable(),
  referenceLetters: Yup.mixed().nullable(),
  workExperienceCv: Yup.mixed().nullable(),
  additionalSupporting: Yup.mixed().nullable(),
});

export const applicationReviewSchema = Yup.object({
  confirmed: Yup.boolean()
    .oneOf([true], "You must confirm before submitting.")
    .required(ErrorMessage.REQUIRED),
});

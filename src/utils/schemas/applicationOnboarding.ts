import * as Yup from "yup";
import { storageKeys } from "../enum";
import { isStoredFileSnapshot } from "../fileSnapshot";
import { getLocalItem } from "../localstorage";
import { ErrorMessage } from "../static";
import type { IApplicationOnboarding } from "@/app/onboarding/application/types";

function hasPersistedUpload(
  field: keyof NonNullable<IApplicationOnboarding["uploadDocuments"]>,
): boolean {
  const data = getLocalItem<Partial<IApplicationOnboarding>>(
    storageKeys.APPLICATION_ONBOARDING_DETAILS,
  );
  const v = data?.uploadDocuments?.[field];
  return (
    (typeof v === "string" && v.trim().length > 0) || isStoredFileSnapshot(v)
  );
}

function fileRequired(field: keyof NonNullable<IApplicationOnboarding["uploadDocuments"]>) {
  return Yup.mixed().nullable().test(
    "file-or-persisted",
    ErrorMessage.REQUIRED,
    (val) =>
      val instanceof File ||
      hasPersistedUpload(field),
  );
}

export const applicationSelectStudentSchema = Yup.object({
  studentId: Yup.string().required(ErrorMessage.REQUIRED),
});

export const applicationChooseProgramSchema = Yup.object({
  country: Yup.string().required(ErrorMessage.REQUIRED),
  intake: Yup.string().required(ErrorMessage.REQUIRED),
  university: Yup.string().required(ErrorMessage.REQUIRED),
  program: Yup.string().required(ErrorMessage.REQUIRED),
  levelOfStudy: Yup.string(),
  studyMode: Yup.string(),
  applicationNotes: Yup.string(),
});

export const applicationUploadDocumentsSchema = Yup.object({
  passportCopy: fileRequired("passportCopy"),
  academicTranscripts: fileRequired("academicTranscripts"),
  englishProficiency: fileRequired("englishProficiency"),
  statementOfPurpose: fileRequired("statementOfPurpose"),
  /** Optional uploads — Formik uses `null` when empty; mixed() rejects null unless nullable. */
  referenceLetters: Yup.mixed().nullable(),
  workExperienceCv: Yup.mixed().nullable(),
  additionalSupporting: Yup.mixed().nullable(),
});

export const applicationReviewSchema = Yup.object({
  confirmed: Yup.boolean()
    .oneOf([true], "You must confirm before submitting.")
    .required(ErrorMessage.REQUIRED),
});

import type { UploadFileChangeEvent } from "@/shared/input/UploadFile";
import { fileSnapshotOrPersisted } from "@/app/onboarding/partner/partnerOnboardingStorage";
import { isStoredFileSnapshot, snapshotToFile } from "@/utils/fileSnapshot";
import { applicationUploadDocumentsSchema } from "@/utils/schemas/applicationOnboarding";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
  readApplicationOnboarding,
  writeApplicationOnboarding,
} from "../applicationOnboardingStorage";
import type { ApplicationUploadDocuments } from "../types";

type FormValues = {
  passportCopy: File | null;
  academicTranscripts: File | null;
  englishProficiency: File | null;
  statementOfPurpose: File | null;
  referenceLetters: File | null;
  workExperienceCv: File | null;
  additionalSupporting: File | null;
};

const empty: FormValues = {
  passportCopy: null,
  academicTranscripts: null,
  englishProficiency: null,
  statementOfPurpose: null,
  referenceLetters: null,
  workExperienceCv: null,
  additionalSupporting: null,
};

const useHook = () => {
  const router = useRouter();

  const initialValues = useMemo((): FormValues => {
    const u = readApplicationOnboarding().uploadDocuments;
    if (!u) return { ...empty };
    return {
      passportCopy: null,
      academicTranscripts: null,
      englishProficiency: null,
      statementOfPurpose: null,
      referenceLetters: null,
      workExperienceCv: null,
      additionalSupporting: null,
    };
  }, []);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: applicationUploadDocumentsSchema,
    onSubmit: async (submitted) => {
      const prev = readApplicationOnboarding().uploadDocuments ?? {};
      const next: ApplicationUploadDocuments = {
        passportCopy: await fileSnapshotOrPersisted(
          submitted.passportCopy,
          prev.passportCopy,
        ),
        academicTranscripts: await fileSnapshotOrPersisted(
          submitted.academicTranscripts,
          prev.academicTranscripts,
        ),
        englishProficiency: await fileSnapshotOrPersisted(
          submitted.englishProficiency,
          prev.englishProficiency,
        ),
        statementOfPurpose: await fileSnapshotOrPersisted(
          submitted.statementOfPurpose,
          prev.statementOfPurpose,
        ),
        referenceLetters: await fileSnapshotOrPersisted(
          submitted.referenceLetters,
          prev.referenceLetters,
        ),
        workExperienceCv: await fileSnapshotOrPersisted(
          submitted.workExperienceCv,
          prev.workExperienceCv,
        ),
        additionalSupporting: await fileSnapshotOrPersisted(
          submitted.additionalSupporting,
          prev.additionalSupporting,
        ),
      };
      writeApplicationOnboarding({ uploadDocuments: next });
      router.push("/onboarding/application/review-submit");
    },
  });

  useEffect(() => {
    const u = readApplicationOnboarding().uploadDocuments;
    if (!u) return;
    const keys = [
      "passportCopy",
      "academicTranscripts",
      "englishProficiency",
      "statementOfPurpose",
      "referenceLetters",
      "workExperienceCv",
      "additionalSupporting",
    ] as const;
    for (const k of keys) {
      const v = u[k];
      if (v && isStoredFileSnapshot(v)) {
        setFieldValue(k, snapshotToFile(v));
      }
    }
  }, [setFieldValue]);

  const onFile =
    (name: keyof FormValues) => (e: UploadFileChangeEvent) => {
      setFieldValue(name, e.target.file);
      setFieldTouched(name, true);
    };

  const uploadField = (
    name: keyof FormValues,
    label: string,
    required: boolean,
    subText: string,
  ) => ({
    name,
    label,
    required,
    subText,
    value: values[name],
    onChange: onFile(name),
    errorMessage:
      errors[name] && touched[name] ? (errors[name] as string) : "",
  });

  return {
    handleSubmit,
    infoBanner:
      "Upload clear, legible copies. Accepted formats: PDF, JPG, PNG. Max 10MB per file.",
    documentFields: [
      uploadField(
        "passportCopy",
        "Passport Copy",
        false,
        "PDF, JPG, PNG • Max 10MB",
      ),
      uploadField(
        "academicTranscripts",
        "Academic Transcripts",
        false,
        "All semesters/years • PDF • Max 20MB",
      ),
      uploadField(
        "englishProficiency",
        "English Proficiency Test",
        false,
        "IELTS/TOEFL/PTE score report • PDF",
      ),
      uploadField(
        "statementOfPurpose",
        "Statement of Purpose",
        false,
        "PDF • Max 5MB",
      ),
      uploadField(
        "referenceLetters",
        "Reference / Recommendation Letters",
        false,
        "Up to 3 letters • PDF",
      ),
      uploadField(
        "workExperienceCv",
        "Work Experience / CV",
        false,
        "PDF • Max 5MB",
      ),
      uploadField(
        "additionalSupporting",
        "Additional Supporting Documents",
        false,
        "Any other relevant documents",
      ),
    ],
  };
};

export default useHook;

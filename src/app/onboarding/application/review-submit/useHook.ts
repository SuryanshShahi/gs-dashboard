import { newApplication } from "@/apis/apis";
import { showToast } from "@/shared/ToastMessage";
import { storageKeys } from "@/utils/enum";
import { isStoredFileSnapshot } from "@/utils/fileSnapshot";
import { removeLocalItem } from "@/utils/localstorage";
import { applicationReviewSchema } from "@/utils/schemas/applicationOnboarding";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  readApplicationOnboarding
} from "../applicationOnboardingStorage";
import {
  COUNTRY_OPTIONS,
  INTAKE_OPTIONS,
  LEVEL_OPTIONS,
  PROGRAM_OPTIONS,
  STUDY_MODE_OPTIONS,
  UNIVERSITY_OPTIONS,
} from "../choose-program/constants";
import type { ApplicationUploadDocuments } from "../types";

function labelFor(
  options: { label: string; value: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function getDocUploadStatus(
  field: keyof ApplicationUploadDocuments,
): "Uploaded" | "Pending" {
  const u = readApplicationOnboarding().uploadDocuments;
  const v = u?.[field];
  if (!v) return "Pending";
  if (typeof v === "string" && v.trim()) return "Uploaded";
  if (isStoredFileSnapshot(v)) return "Uploaded";
  return "Pending";
}

const useHook = () => {
  const router = useRouter();

  const data = readApplicationOnboarding();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      confirmed: readApplicationOnboarding().reviewConfirmed ?? false,
    },
    enableReinitialize: true,
    validationSchema: applicationReviewSchema,
    onSubmit: (val) => {
      // newApplicationMutation({
      //   studentId: data.selectStudent?.studentId,
      //   universityId: data.chooseProgram?.university,
      //   programId: data.chooseProgram?.program,
      //   intakeMonth: data.chooseProgram?.intake,
      //   intakeYear: data.chooseProgram?.intake,
      //   studyMode: data.chooseProgram?.studyMode,
      //   scholarshipInterest: val.scholarshipInterest,
      //   fundingSource: val.fundingSource,
      //   partnerNotes: data.chooseProgram?.notes,
      // });
    },
  });

  const p = data.chooseProgram;
  const s = data.selectStudent;

  const programSummary = p
    ? {
      country: labelFor(COUNTRY_OPTIONS, p.country),
      intake: labelFor(INTAKE_OPTIONS, p.intake),
      university: labelFor(UNIVERSITY_OPTIONS, p.university),
      program: labelFor(PROGRAM_OPTIONS, p.program),
      level: p.levelOfStudy
        ? labelFor(LEVEL_OPTIONS, p.levelOfStudy)
        : "—",
      mode: p.studyMode ? labelFor(STUDY_MODE_OPTIONS, p.studyMode) : "—",
    }
    : null;

  const docRows: {
    key: keyof ApplicationUploadDocuments;
    label: string;
  }[] = [
      { key: "passportCopy", label: "Passport Copy" },
      { key: "academicTranscripts", label: "Academic Transcripts" },
      { key: "englishProficiency", label: "English Proficiency Test" },
      { key: "statementOfPurpose", label: "Statement of Purpose" },
      { key: "referenceLetters", label: "Reference Letters" },
      { key: "workExperienceCv", label: "Work Experience / CV" },
      { key: "additionalSupporting", label: "Additional Supporting" },
    ];
  const { mutate: newApplicationMutation, isPending: isNewApplicationPending } = useMutation({
    mutationFn: newApplication,
    onSuccess: () => {
      removeLocalItem(storageKeys.APPLICATION_ONBOARDING_DETAILS);
      showToast({
        type: "success",
        title: "Application submitted",
        subtitle: "Your application has been sent for review.",
      });
      router.replace("/applications");
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "Error submitting application",
        subtitle: error.message,
      });
    },
  });
  return {
    handleSubmit,
    student: s,
    chooseProgram: data.chooseProgram,
    programSummary,
    docRows,
    getDocUploadStatus,
    confirmed: values.confirmed,
    confirmedError:
      errors.confirmed && touched.confirmed ? errors.confirmed : "",
    onChangeConfirmed: handleChange,
  };
};

export default useHook;

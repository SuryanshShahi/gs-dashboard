import { createNewApplication } from "@/apis/apis";
import { showToast } from "@/shared/ToastMessage";
import { storageKeys } from "@/utils/enum";
import { isStoredFileSnapshot } from "@/utils/fileSnapshot";
import { removeLocalItem } from "@/utils/localstorage";
import { applicationReviewSchema } from "@/utils/schemas/applicationOnboarding";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { readApplicationOnboarding } from "../applicationOnboardingStorage";
import { type ApplicationUploadDocuments } from "../types";

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

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      confirmed: readApplicationOnboarding().reviewConfirmed ?? false,
    },
    enableReinitialize: true,
    validationSchema: applicationReviewSchema,
    onSubmit: (val) => {
      const country = data.chooseProgram?.country;
      const uni = data.chooseProgram?.university;
      const prog = data.chooseProgram?.program;
      newApplicationMutation({
        studentId: data.selectStudent?.studentId as string,
        countryId: Number(country?.value) || undefined,
        universityId: uni?.value || "",
        programId: prog?.value || "",
        intakeMonth: 5,
        intakeYear: data.chooseProgram?.intake
          ? Number(data.chooseProgram?.intake)
          : undefined,
        studyMode: data.chooseProgram?.studyMode
          ? data.chooseProgram?.studyMode
          : undefined,
        // scholarshipInterest: val.scholarshipInterest ?? false,
        // fundingSource: val.fundingSource ?? undefined,
        partnerNotes: data.chooseProgram?.applicationNotes
          ? data.chooseProgram?.applicationNotes
          : undefined,
      });
    },
  });

  const p = data.chooseProgram;
  const s = data.selectStudent;

  const programSummary = p
    ? {
      country: p?.country?.label || "—",
      intake: p?.intake || "—",
      university: p?.university?.label || "—",
      program: p?.program?.label || "—",
      level: p?.levelOfStudy || "—",
      mode: p?.studyMode || "—",
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
  const { mutate: newApplicationMutation, isPending: isNewApplicationPending } =
    useMutation({
      mutationFn: createNewApplication,
      onSuccess: () => {
        removeLocalItem(storageKeys.APPLICATION_ONBOARDING_DETAILS);
        showToast({
          type: "success",
          title: "Application submitted",
          subtitle: "Your application has been sent for review.",
        });
        router.replace("/applications");
      },
      onError: (err: any) => {
        showToast({
          type: "error",
          title: err.response.data.message,
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

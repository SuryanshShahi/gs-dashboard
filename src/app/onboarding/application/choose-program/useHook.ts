import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { applicationChooseProgramSchema } from "@/utils/schemas/applicationOnboarding";
import { persistedString } from "../../partner/partnerOnboardingStorage";
import {
  readApplicationOnboarding,
  writeApplicationOnboarding,
} from "../applicationOnboardingStorage";
import {
  COUNTRY_OPTIONS,
  INTAKE_OPTIONS,
  LEVEL_OPTIONS,
  PROGRAM_OPTIONS,
  STUDY_MODE_OPTIONS,
  UNIVERSITY_OPTIONS,
} from "./constants";

const useHook = () => {
  const router = useRouter();

  const initialValues = useMemo(() => {
    const p = readApplicationOnboarding().chooseProgram;
    return {
      country: persistedString(p?.country),
      intake: persistedString(p?.intake),
      university: persistedString(p?.university),
      program: persistedString(p?.program),
      levelOfStudy: persistedString(p?.levelOfStudy),
      studyMode: persistedString(p?.studyMode),
      applicationNotes: persistedString(p?.applicationNotes),
    };
  }, []);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: applicationChooseProgramSchema,
    onSubmit: (submitted) => {
      writeApplicationOnboarding({ chooseProgram: submitted });
      router.push("/onboarding/application/upload-documents");
    },
  });

  const sel = (name: keyof typeof values, label: string, required: boolean) => ({
    name: name as string,
    label,
    required,
    options:
      name === "country"
        ? COUNTRY_OPTIONS
        : name === "intake"
          ? INTAKE_OPTIONS
          : name === "university"
            ? UNIVERSITY_OPTIONS
            : name === "program"
              ? PROGRAM_OPTIONS
              : name === "levelOfStudy"
                ? LEVEL_OPTIONS
                : STUDY_MODE_OPTIONS,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    errorMessage:
      errors[name] && touched[name] ? (errors[name] as string) : "",
  });

  return {
    handleSubmit,
    destinationSelects: [sel("country", "Country", true), sel("intake", "Intake", true)],
    institutionSelects: [
      sel("university", "University", true),
      sel("program", "Program", true),
    ],
    studySelects: [
      sel("levelOfStudy", "Level of Study", false),
      sel("studyMode", "Study Mode", false),
    ],
    applicationNotes: {
      name: "applicationNotes" as const,
      label: "Application Notes",
      value: values.applicationNotes,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage:
        errors.applicationNotes && touched.applicationNotes
          ? (errors.applicationNotes as string)
          : "",
    },
  };
};

export default useHook;

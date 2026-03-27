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
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@/apis/apis";
import { IUniversity } from "@/features/masterData/universities/types";
import useCountries from "@/utils/hooks/useCountries";

const useHook = () => {
  const router = useRouter();
  const { countriesOptions } = useCountries({});
  const { data: universities } = useQuery<IUniversity[]>({
    queryKey: ["universities"],
    queryFn: () => getUniversities(),
  });
  const universityOptions = useMemo(() => {
    return (
      universities?.map((university) => ({
        label: university.name,
        value: university.id,
      })) ?? []
    );
  }, [universities]);
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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: applicationChooseProgramSchema,
      onSubmit: (submitted) => {
        writeApplicationOnboarding({ chooseProgram: submitted });
        router.push("/onboarding/application/upload-documents");
      },
    });

  const inputFields = [
    {
      label: "Destination",
      fields: [
        {
          name: "country",
          label: "Country",
          placeholder: "Select Country",
          type: "select",
          required: true,
          options: countriesOptions,
          value: values.country,
          onChange: handleChange,
          onBlur: handleBlur,
          errorMessage:
            errors.country && touched.country ? (errors.country as string) : "",
        },
        {
          name: "intake",
          label: "Intake",
          placeholder: "Select Intake",
          type: "select",
          required: true,
          options: INTAKE_OPTIONS,
          value: values.intake,
          onChange: handleChange,
          onBlur: handleBlur,
          errorMessage:
            errors.intake && touched.intake ? (errors.intake as string) : "",
        },
      ],
    },
    {
      label: "Institution",
      fields: [
        {
          name: "university",
          label: "University",
          placeholder: "Select University",
          className: "col-span-2",
          type: "select",
          required: true,
          options: universityOptions,
          value: values.university,
          onChange: handleChange,
          onBlur: handleBlur,
          errorMessage:
            errors.university && touched.university
              ? (errors.university as string)
              : "",
        },
        {
          name: "program",
          label: "Program",
          placeholder: "Select Program",
          className: "col-span-2",
          type: "select",
          required: true,
          options: PROGRAM_OPTIONS,
          value: values.program,
          onChange: handleChange,
          onBlur: handleBlur,
          errorMessage:
            errors.program && touched.program ? (errors.program as string) : "",
        },
      ],
    },

    {
      label: "Study Details",
      fields: [
        {
          name: "levelOfStudy",
          label: "Level of Study",
          placeholder: "Select Level of Study",
          type: "select",
          options: LEVEL_OPTIONS,
          value: values.levelOfStudy,
          onChange: handleChange,
          onBlur: handleBlur,
          errorMessage:
            errors.levelOfStudy && touched.levelOfStudy
              ? (errors.levelOfStudy as string)
              : "",
        },
        {
          name: "studyMode",
          label: "Study Mode",
          placeholder: "Select Study Mode",
          type: "select",
          options: STUDY_MODE_OPTIONS,
          value: values.studyMode,
          onChange: handleChange,
          onBlur: handleBlur,
          errorMessage:
            errors.studyMode && touched.studyMode
              ? (errors.studyMode as string)
              : "",
        },
      ],
    },
    {
      label: "Application Info",
      fields: [
        {
          name: "applicationNotes",
          label: "Application Notes",
          placeholder: "Enter Application Notes",
          className: "col-span-2",
          type: "textarea",
          value: values.applicationNotes,
          onChange: handleChange,
          onBlur: handleBlur,
          errorMessage:
            errors.applicationNotes && touched.applicationNotes
              ? (errors.applicationNotes as string)
              : "",
        },
      ],
    },
  ];
  return {
    handleSubmit,
    inputFields,
  };
};

export default useHook;

import type { ISelected } from "@/apis/types";
import { getPrograms, getUniversities } from "@/apis/apis";
import { IProgram } from "@/features/masterData/programs/types";
import { IUniversity } from "@/features/masterData/universities/types";
import useCountries from "@/utils/hooks/useCountries";
import { applicationChooseProgramSchema } from "@/utils/schemas/applicationOnboarding";
import { useQuery } from "@tanstack/react-query";
import { getIn, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { persistedString } from "../../partner/partnerOnboardingStorage";
import {
  readApplicationOnboarding,
  writeApplicationOnboarding,
} from "../applicationOnboardingStorage";
import { LEVEL_OPTIONS, STUDY_MODE_OPTIONS } from "./constants";

const useHook = () => {
  const router = useRouter();
  const { countriesOptions, isLoadingCountries } = useCountries({});
  const { data: universities, isLoading: isLoadingUniversities } = useQuery<IUniversity[]>({
    queryKey: ["universities"],
    queryFn: () => getUniversities(),
  });
  const { data: programs, isLoading: isLoadingPrograms } = useQuery<IProgram[]>({
    queryKey: ["programs"],
    queryFn: () => getPrograms(),
  });
  const universityOptions = useMemo(() => {
    return (
      universities?.map((university) => ({
        label: university.name,
        value: String(university.id),
      })) ?? []
    );
  }, [universities]);
  const programOptions = useMemo(() => {
    return (
      programs?.map((program) => ({
        label: program.name,
        value: String(program.id),
      })) ?? []
    );
  }, [programs]);
  const initialValues = useMemo(() => {
    const p = readApplicationOnboarding().chooseProgram;
    return {
      country: p?.country,
      university: p?.university,
      program: p?.program,
      intake: persistedString(p?.intake),
      levelOfStudy: persistedString(p?.levelOfStudy),
      studyMode:
        persistedString(p?.studyMode) || STUDY_MODE_OPTIONS[0]?.value || "",
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
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: applicationChooseProgramSchema,
    onSubmit: (submitted) => {
      writeApplicationOnboarding({ chooseProgram: submitted });
      router.push("/onboarding/application/upload-documents");
    },
  });

  const fieldError = (path: string) => {
    const err = getIn(errors, path);
    const tch = getIn(touched, path);
    return tch && err ? String(err) : "";
  };

  const inputFields = [
    {
      label: "Destination",
      fields: [
        {
          name: "country.value",
          label: "Country",
          placeholder: "Select Country",
          type: "select",
          required: true,
          options: countriesOptions ?? [],
          value: values.country?.value ?? "",
          onLabeledChange: (opt: ISelected) => setFieldValue("country", opt),
          onBlur: handleBlur,
          errorMessage: fieldError("country.value"),
        },
      ],
    },
    {
      label: "Institution",
      fields: [
        {
          name: "university.value",
          label: "University",
          placeholder: "Select University",
          className: "col-span-2",
          type: "select",
          required: true,
          options: universityOptions,
          value: values.university?.value ?? "",
          onLabeledChange: (opt: ISelected) => setFieldValue("university", opt),
          onBlur: handleBlur,
          errorMessage: fieldError("university.value"),
        },
        {
          name: "program.value",
          label: "Program",
          placeholder: "Select Program",
          className: "col-span-1",
          type: "select",
          required: true,
          options: programOptions,
          value: values.program?.value ?? "",
          onLabeledChange: (opt: ISelected) => setFieldValue("program", opt),
          onBlur: handleBlur,
          errorMessage: fieldError("program.value"),
        },
        {
          name: "intake",
          label: "Intake",
          placeholder: "Select Intake",
          className: "col-span-1",
          type: "select",
          required: true,
          options:
            programs
              ?.find((program) => String(program.id) === values.program?.value)
              ?.intakes?.map((intake) => ({
                label: intake,
                value: intake,
              })) ?? [],
          value: values.intake,
          onChange: handleChange,
          onBlur: handleBlur,
          errorMessage:
            errors.intake && touched.intake ? (errors.intake as string) : "",
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
    isLoading: isLoadingUniversities || isLoadingPrograms || isLoadingCountries,
  };
};

export default useHook;

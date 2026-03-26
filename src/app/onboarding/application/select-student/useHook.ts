import { getStudents } from "@/apis/apis";
import { IStudentResponse } from "@/features/students/types";
import { combine } from "@/utils/functions";
import { applicationSelectStudentSchema } from "@/utils/schemas/applicationOnboarding";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  readApplicationOnboarding,
  writeApplicationOnboarding,
} from "../applicationOnboardingStorage";
import useDebounce from "@/utils/hooks/useDebounce";

const useHook = () => {
  const router = useRouter();

  const initialValues = useMemo(() => {
    const s = readApplicationOnboarding().selectStudent;
    return {
      selectedStudent: {
        studentId: s?.studentId ?? "",
        studentName: s?.studentName ?? "",
        studentEmail: s?.studentEmail ?? "",
        countryLabel: s?.countryLabel ?? "",
      },
      search: "",
    };
  }, []);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    submitCount,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: applicationSelectStudentSchema,
    onSubmit: (val) => {
      writeApplicationOnboarding({
        selectStudent: {
          studentId: val.selectedStudent.studentId,
          studentName: (val.selectedStudent.studentName),
          studentEmail: val.selectedStudent.studentEmail,
          countryLabel: val.selectedStudent.countryLabel,
        },
      });
      router.push("/onboarding/application/choose-program");
    },
  });
  const debouncedSearch = useDebounce(values.search, 300);
  const { data: students, isLoading: isStudentsLoading } = useQuery<IStudentResponse>({
    queryKey: ["students", debouncedSearch],
    queryFn: () => getStudents(debouncedSearch),
  });

  const selectedStudentError = errors.selectedStudent;
  const submitError =
    selectedStudentError && (touched.selectedStudent || submitCount > 0)
      ? typeof selectedStudentError === "string"
        ? selectedStudentError
        : selectedStudentError.studentId ?? ""
      : "";


  return {
    isStudentsLoading,
    students: students?.data.map((s) => ({
      studentId: s.id,
      studentName: combine(s.firstName, s.lastName),
      studentEmail: s.personalEmail,
      countryLabel: s.countryOfResidence,
    })) ?? [],
    handleSubmit,
    setFieldValue,
    submitError,
    values,
  };
};

export default useHook;

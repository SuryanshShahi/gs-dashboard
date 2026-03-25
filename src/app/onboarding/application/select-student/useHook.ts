import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { applicationSelectStudentSchema } from "@/utils/schemas/applicationOnboarding";
import {
  readApplicationOnboarding,
  writeApplicationOnboarding,
} from "../applicationOnboardingStorage";
import { MOCK_EXISTING_STUDENTS } from "./mockStudents";

const useHook = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const initialValues = useMemo(() => {
    const s = readApplicationOnboarding().selectStudent;
    return {
      studentId: s?.studentId ?? "",
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
    onSubmit: (submitted) => {
      const picked = MOCK_EXISTING_STUDENTS.find(
        (x) => x.id === submitted.studentId,
      );
      if (!picked) return;
      writeApplicationOnboarding({
        selectStudent: {
          studentId: picked.id,
          studentName: picked.name,
          studentEmail: picked.email,
          countryLabel: picked.country,
        },
      });
      router.push("/onboarding/application/choose-program");
    },
  });

  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return MOCK_EXISTING_STUDENTS;
    return MOCK_EXISTING_STUDENTS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q),
    );
  }, [search]);

  const selectStudent = (id: string) => {
    setFieldValue("studentId", id);
  };

  return {
    search,
    setSearch,
    filteredStudents,
    selectedId: values.studentId,
    selectStudent,
    handleSubmit,
    submitError:
      errors.studentId && (touched.studentId || submitCount > 0)
        ? errors.studentId
        : "",
  };
};

export default useHook;

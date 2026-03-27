import { addProgram, getUniversities } from "@/apis/apis";
import type { IAddProgram } from "@/apis/types";
import type { IDropdown } from "@/shared/input/Dropdown";
import type { IInputField } from "@/shared/input/InputField";
import { showToast } from "@/shared/ToastMessage";
import { addProgramSchema } from "@/utils/schemas/masterData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";

export type AddProgramFormValues = {
  name: string;
  universityId: string;
  level: string;
  studyMode: string;
  duration: string;
  tuitionFee: string;
  intakes: string;
  status: "ACTIVE" | "INACTIVE";
};

export type AddProgramInputField =
  | ({
    type: "select";
    className: string;
    options: NonNullable<IDropdown["options"]>;
    placeholder?: string;
  } & Omit<IDropdown, "options" | "type">)
  | ({ className: string } & IInputField);

const initialValues: AddProgramFormValues = {
  name: "",
  universityId: "",
  level: "",
  studyMode: "",
  duration: "",
  tuitionFee: "",
  intakes: "",
  status: "ACTIVE",
};

const useHook = ({ close }: { close: () => void }) => {
  const queryClient = useQueryClient();

  const { data: universities } = useQuery<
    { id: string; name: string; country?: string }[]
  >({
    queryKey: ["universities"],
    queryFn: getUniversities,
  });

  const { mutate: addProgramMutation, isPending } = useMutation({
    mutationFn: (payload: IAddProgram) => addProgram(payload),
    onSuccess: () => {
      formik.resetForm();
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      showToast({
        type: "success",
        title: "Program added successfully.",
      });
      close();
    },
    onError: (err: any) => {
      showToast({
        type: "error",
        title: "Something went wrong!",
        subtitle: err?.response?.data?.message,
      });
    },
  });

  const formik = useFormik<AddProgramFormValues>({
    initialValues,
    validationSchema: addProgramSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      const name = String(values.name ?? "").trim();
      const universityId = String(values.universityId ?? "");
      const level = String(values.level ?? "");
      const studyMode = String(values.studyMode ?? "");
      const duration = String(values.duration ?? "").trim();
      const tuitionFee = String(values.tuitionFee ?? "").trim();
      const intakesValue = String(values.intakes ?? "");

      addProgramMutation({
        name,
        universityId,
        level,
        studyMode,
        duration: duration || undefined,
        tuitionFee,
        currency: "GBP",
        intakes: intakesValue
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean),
        isActive: values.status === "ACTIVE",
      });
    },
  });

  const showError = (field: keyof AddProgramFormValues) =>
    formik.errors[field] && (formik.touched[field] || formik.submitCount > 0)
      ? formik.errors[field]
      : "";

  const isSubmitDisabled = Object.keys(formik.errors).length > 0;

  const universityOptions =
    universities?.map((u) => ({
      label: u.country ? `${u.name} (${u.country})` : u.name,
      value: u.id,
    })) ?? [];

  const inputFields = [
    {
      className: "col-span-2",
      label: "Program Name",
      required: true,
      name: "name",
      type: "text",
      placeholder: "e.g. MSc Computer Science",
      value: formik.values.name,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      errorMessage: showError("name"),
    },
    {
      className: "col-span-2",
      label: "University",
      required: true,
      name: "universityId",
      type: "select",
      placeholder: "Select university",
      value: formik.values.universityId,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      options: universityOptions,
      errorMessage: showError("universityId"),
    },
    {
      className: "col-span-1",
      label: "Level",
      required: true,
      name: "level",
      type: "select",
      placeholder: "Select level",
      value: formik.values.level,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      options: [
        { label: "Undergraduate", value: "UNDERGRADUATE" },
        { label: "Postgraduate", value: "POSTGRADUATE" },
        { label: "PhD", value: "PHD" },
        { label: "Diploma", value: "DIPLOMA" },
      ],
      errorMessage: showError("level"),
    },
    {
      className: "col-span-1",
      label: "Study Mode",
      required: true,
      name: "studyMode",
      type: "select",
      placeholder: "Select study mode",
      value: formik.values.studyMode,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      options: [
        { label: "Full-Time", value: "Full-Time" },
        { label: "Part-Time", value: "Part-Time" },
      ],
      errorMessage: showError("studyMode"),
    },
    {
      className: "col-span-1",
      label: "Duration",
      name: "duration",
      type: "select",
      placeholder: "Select duration",
      value: formik.values.duration,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      options: [
        { label: "6 months", value: "6 months" },
        { label: "1 year", value: "1 year" },
        { label: "1.5 years", value: "1.5 years" },
        { label: "2 years", value: "2 years" },
        { label: "3 years", value: "3 years" },
        { label: "4 years", value: "4 years" },
      ],
      errorMessage: showError("duration"),
    },
    {
      className: "col-span-1",
      label: "Annual Tuition",
      required: true,
      name: "tuitionFee",
      type: "number",
      min: 0,
      placeholder: "e.g. 18000 (GBP/yr)",
      value: formik.values.tuitionFee,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      errorMessage: showError("tuitionFee"),
    },
    {
      className: "col-span-1",
      label: "Intakes",
      name: "intakes",
      type: "text",
      placeholder: "e.g. Sep 2025, Jan 2026",
      value: formik.values.intakes,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      errorMessage: showError("intakes"),
    },
    {
      className: "col-span-1",
      label: "Status",
      name: "status",
      type: "select",
      value: formik.values.status,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      options: [
        { label: "Active", value: "ACTIVE" },
        { label: "Inactive", value: "INACTIVE" },
      ],
    },
  ];

  return {
    inputFields,
    handleSubmit: formik.handleSubmit,
    isSubmitDisabled,
    resetForm: formik.resetForm,
    isPending,
  };
};

export default useHook;


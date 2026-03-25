import type { UploadFileChangeEvent } from "@/shared/input/UploadFile";
import { storageKeys } from "@/utils/enum";
import { isStoredFileSnapshot, snapshotToFile } from "@/utils/fileSnapshot";
import { setLocalItem } from "@/utils/localstorage";
import { studentPersonalSchema } from "@/utils/schemas/students";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
  fileSnapshotOrPersisted,
  persistedString,
} from "../../partner/partnerOnboardingStorage";
import { readStudentOnboarding } from "../studentOnboardingStorage";
import { STUDENT_COUNTRY_OPTIONS } from "../types";

const useHook = () => {
  const router = useRouter();

  const initialValues = useMemo(() => {
    const stored = readStudentOnboarding();
    const p = stored.personalDetails;
    return {
      firstName: persistedString(p?.firstName),
      middleName: persistedString(p?.middleName),
      lastName: persistedString(p?.lastName),
      personalEmail: persistedString(p?.personalEmail),
      phone: persistedString(p?.phone),
      whatsapp: persistedString(p?.whatsapp),
      gender: persistedString(p?.gender),
      dateOfBirth: persistedString(p?.dateOfBirth),
      addressLine1: persistedString(p?.addressLine1),
      country: persistedString(p?.country),
      state: persistedString(p?.state),
      city: persistedString(p?.city),
      pincode: persistedString(p?.pincode),
      profilePhoto: null as File | null,
    };
  }, []);

  const {
    values,
    errors,
    touched,
    submitCount,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (submitted) => {
      const prev = readStudentOnboarding();
      const prevPersonal = prev.personalDetails;
      const profilePhoto = await fileSnapshotOrPersisted(
        submitted.profilePhoto,
        prevPersonal?.profilePhoto,
      );
      setLocalItem(storageKeys.STUDENT_ONBOARDING_DETAILS, {
        ...prev,
        personalDetails: {
          ...submitted,
          profilePhoto,
        },
      });
      router.push("/onboarding/student/passport-details");
    },
    validationSchema: studentPersonalSchema,
  });

  useEffect(() => {
    const p = readStudentOnboarding().personalDetails;
    if (!p?.profilePhoto || !isStoredFileSnapshot(p.profilePhoto)) return;
    setFieldValue("profilePhoto", snapshotToFile(p.profilePhoto));
  }, [setFieldValue]);

  const onProfilePhotoChange = (e: UploadFileChangeEvent) => {
    const file = e.target.file;
    setFieldValue("profilePhoto", file);
  };

  const countrySelectOptions = STUDENT_COUNTRY_OPTIONS.map((o) => ({
    label: o.label,
    value: o.value,
  }));

  const inputFields = [
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Enter first name",
      required: true,
      className: "col-span-1",
      type: "text" as const,
      value: values.firstName,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage:
        errors.firstName && touched.firstName ? errors.firstName : "",
    },
    {
      label: "Middle Name",
      name: "middleName",
      placeholder: "Enter middle name",
      className: "col-span-1",
      type: "text" as const,
      value: values.middleName,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage:
        errors.middleName && touched.middleName ? errors.middleName : "",
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter last name",
      required: true,
      className: "col-span-1",
      type: "text" as const,
      value: values.lastName,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage: errors.lastName && touched.lastName ? errors.lastName : "",
    },
    {
      label: "Email",
      name: "personalEmail",
      placeholder: "Enter email address",
      required: true,
      className: "col-span-2",
      type: "email" as const,
      value: values.personalEmail,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage:
        errors.personalEmail && touched.personalEmail
          ? errors.personalEmail
          : "",
    },
    {
      label: "Phone Number",
      name: "phone",
      placeholder: "Enter phone",
      required: true,
      className: "col-span-1",
      type: "tel" as const,
      value: values.phone,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage: errors.phone && touched.phone ? errors.phone : "",
    },
    {
      label: "WhatsApp (optional)",
      name: "whatsapp",
      placeholder: "Enter WhatsApp number",
      className: "col-span-1",
      type: "tel" as const,
      value: values.whatsapp,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage: errors.whatsapp && touched.whatsapp ? errors.whatsapp : "",
    },
    {
      label: "Select Gender",
      name: "gender",
      required: true,
      className: "col-span-2",
      type: "gender" as const,
    },
    {
      label: "Date of Birth",
      name: "dateOfBirth",
      required: true,
      className: "col-span-2",
      type: "date" as const,
      max: new Date().toISOString().split("T")[0],
      value: values.dateOfBirth,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage:
        errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : "",
    },
    {
      label: "Address",
      name: "addressLine1",
      placeholder: "Enter address",
      required: true,
      className: "col-span-2",
      type: "text" as const,
      value: values.addressLine1,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage:
        errors.addressLine1 && touched.addressLine1 ? errors.addressLine1 : "",
    },
    {
      label: "Country",
      name: "country",
      placeholder: "Select country",
      required: true,
      className: "col-span-1",
      type: "select" as const,
      options: countrySelectOptions,
      value: values.country,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage: errors.country && touched.country ? errors.country : "",
    },
    {
      label: "State",
      name: "state",
      placeholder: "Enter state",
      required: true,
      className: "col-span-1",
      type: "text" as const,
      value: values.state,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage: errors.state && touched.state ? errors.state : "",
    },
    {
      label: "City",
      name: "city",
      placeholder: "Enter city",
      required: true,
      className: "col-span-1",
      type: "text" as const,
      value: values.city,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage: errors.city && touched.city ? errors.city : "",
    },
    {
      label: "Pincode",
      name: "pincode",
      placeholder: "Enter pincode",
      required: true,
      className: "col-span-1",
      type: "text" as const,
      value: values.pincode,
      onChange: handleChange,
      onBlur: handleBlur,
      errorMessage: errors.pincode && touched.pincode ? errors.pincode : "",
    },
    {
      label: "Photo",
      name: "profilePhoto",
      subText: "Format: JPEG or PNG • Max Size: 10MB • Min Res: 500px X 500px",
      className: "col-span-2",
      type: "file" as const,
      variant: "image" as const,
      value: values.profilePhoto,
      onChange: onProfilePhotoChange,
      onBlur: handleBlur,
      errorMessage:
        errors.profilePhoto && touched.profilePhoto ? errors.profilePhoto : "",
    },
  ];

  return {
    inputFields,
    handleSubmit,
    gender: values.gender,
    genderError:
      errors.gender && (touched.gender || submitCount > 0)
        ? errors.gender
        : "",
    setGender: (value: string) => setFieldValue("gender", value),
  };
};

export default useHook;

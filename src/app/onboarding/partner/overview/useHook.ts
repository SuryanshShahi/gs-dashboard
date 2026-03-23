import type { UploadFileChangeEvent } from "@/shared/input/UploadFile";
import { storageKeys } from "@/utils/enum";
import { isStoredFileSnapshot, snapshotToFile } from "@/utils/fileSnapshot";
import { setLocalItem } from "@/utils/localstorage";
import { partnersOverviewSchema } from "@/utils/schemas/partners";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
    fileSnapshotOrPersisted,
    persistedString,
    readPartnerOnboarding,
} from "../partnerOnboardingStorage";

const useHook = () => {
    const router = useRouter();
    const initialValues = useMemo(() => {
        const stored = readPartnerOnboarding();
        const o = stored.overview;
        return {
            companyName: persistedString(o?.companyName),
            country: persistedString(o?.country),
            registrationNumber: persistedString(o?.registrationNumber),
            companyEmail: persistedString(o?.companyEmail),
            phone: persistedString(o?.phone),
            registeredCompanyName: persistedString(o?.registeredCompanyName),
            companyType: persistedString(o?.companyType),
            website: persistedString(o?.website),
            phoneNumber: persistedString(o?.phoneNumber),
            email: persistedString(o?.email),
            companyAddress: persistedString(o?.companyAddress),
            state: persistedString(o?.state),
            city: persistedString(o?.city),
            pincode: persistedString(o?.pincode),
            companyLogo: null as File | null,
            companyLogoSquare: null as File | null,
        };
    }, []);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
    } = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (submitted) => {
            const prev = readPartnerOnboarding();
            const prevOverview = prev.overview;
            const [companyLogo, companyLogoSquare] = await Promise.all([
                fileSnapshotOrPersisted(
                    submitted.companyLogo,
                    prevOverview?.companyLogo,
                ),
                fileSnapshotOrPersisted(
                    submitted.companyLogoSquare,
                    prevOverview?.companyLogoSquare,
                ),
            ]);
            setLocalItem(storageKeys.PARTNER_ONBOARDING_DETAILS, {
                ...prev,
                overview: {
                    ...submitted,
                    companyLogo,
                    companyLogoSquare,
                },
            });
            router.push("/onboarding/partner/contract-document");
        },
        validationSchema: partnersOverviewSchema,
    });

    useEffect(() => {
        const overview = readPartnerOnboarding().overview;
        if (!overview) return;
        if (isStoredFileSnapshot(overview.companyLogo)) {
            setFieldValue("companyLogo", snapshotToFile(overview.companyLogo));
        }
        if (isStoredFileSnapshot(overview.companyLogoSquare)) {
            setFieldValue(
                "companyLogoSquare",
                snapshotToFile(overview.companyLogoSquare),
            );
        }
    }, [setFieldValue]);
    const inputFields = [
        {
            label: "Company Name",
            name: "companyName",
            placeholder: "Enter the partner company name",
            required: true,
            className: "col-span-2",
            type: "text" as const,
            value: values.companyName,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage:
                errors.companyName && touched.companyName ? errors.companyName : "",
        },
        {
            label: "Registered Company Name",
            name: "registeredCompanyName",
            placeholder: "Enter the company's registered name",
            type: "text" as const,
            className: "col-span-2",
            value: values.registeredCompanyName,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage:
                errors.registeredCompanyName && touched.registeredCompanyName
                    ? errors.registeredCompanyName
                    : "",
        },
        {
            label: "Company Type",
            name: "companyType",
            placeholder: "Select Type",
            className: "col-span-1",
            type: "select" as const,
            options: [
                { label: "Company", value: "company" },
                { label: "Individual", value: "individual" },
            ],
            value: values.companyType,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage:
                errors.companyType && touched.companyType ? errors.companyType : "",
        },
        {
            label: "Website",
            name: "website",
            placeholder: "Enter website URL",
            className: "col-span-1",
            type: "text" as const,
            value: values.website,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage: errors.website && touched.website ? errors.website : "",
        },
        {
            label: "Phone Number",
            name: "phoneNumber",
            placeholder: "Enter phone",
            required: true,
            className: "col-span-1",
            type: "tel" as const,
            value: values.phoneNumber,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage:
                errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : "",
        },
        {
            label: "Email",
            name: "email",
            placeholder: "Enter email address",
            type: "email" as const,
            required: true,
            className: "col-span-1",
            value: values.email,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage: errors.email && touched.email ? errors.email : "",
        },
        {
            label: "Company Address",
            name: "companyAddress",
            placeholder: "Search address",
            required: true,
            className: "col-span-2",
            type: "text" as const,
            value: values.companyAddress,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage:
                errors.companyAddress && touched.companyAddress
                    ? errors.companyAddress
                    : "",
        },
        {
            label: "Country",
            name: "country",
            placeholder: "Select country",
            required: true,
            className: "col-span-1",
            type: "select" as const,
            options: [
                { label: "United States", value: "united_states" },
                { label: "Canada", value: "canada" },
                { label: "United Kingdom", value: "united_kingdom" },
                { label: "Australia", value: "australia" },
                { label: "New Zealand", value: "new_zealand" },
                { label: "Other", value: "other" },
            ],
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
            type: "select" as const,
            options: [
                { label: "California", value: "california" },
                { label: "New York", value: "new_york" },
                { label: "Texas", value: "texas" },
                { label: "Other", value: "other" },
            ],
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
            type: "select" as const,
            options: [
                { label: "New York", value: "new_york" },
                { label: "Texas", value: "texas" },
                { label: "Other", value: "other" },
            ],
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
            type: "number" as const,
            value: values.pincode,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage: errors.pincode && touched.pincode ? errors.pincode : "",
        },
        {
            label: "Company Logo",
            subText: "Format: JPEG or PNG • Max Size: 10MB • Min Res: 500px X 500px",
            name: "companyLogo",
            required: true,
            className: "col-span-2",
            type: "file" as const,
            variant: "image" as const,
            value: values.companyLogo,
            onChange: (e: UploadFileChangeEvent) =>
                setFieldValue("companyLogo", e.target.value),
            onBlur: handleBlur,
            errorMessage:
                errors.companyLogo && touched.companyLogo ? errors.companyLogo : "",
        },
        {
            label: "Company Logo Square / Favicon",
            subText: "Format: JPEG or PNG • Max Size: 10MB • Min Res: 500px X 500px",
            name: "companyLogoSquare",
            required: true,
            className: "col-span-2",
            type: "file" as const,
            variant: "image" as const,
            value: values.companyLogoSquare,
            onChange: (e: UploadFileChangeEvent) =>
                setFieldValue("companyLogoSquare", e.target.value),
            onBlur: handleBlur,
            errorMessage:
                errors.companyLogoSquare && touched.companyLogoSquare
                    ? errors.companyLogoSquare
                    : "",
        },
    ];
    return { inputFields, handleSubmit };
};

export default useHook;

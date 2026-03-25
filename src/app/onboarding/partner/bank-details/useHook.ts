import { partnersBankDetailsSchema } from "@/utils/schemas/partners";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { storageKeys } from "@/utils/enum";
import { setLocalItem } from "@/utils/localstorage";
import { useMemo } from "react";
import { persistedString, readPartnerOnboarding } from "../partnerOnboardingStorage";

const useHook = () => {
    const router = useRouter();
    const initialValues = useMemo(() => {
        const b = readPartnerOnboarding().bankDetails;
        return {
            country: persistedString(b?.country),
            bankName: persistedString(b?.bankName),
            accountNumber: persistedString(b?.accountNumber),
            ifscCode: persistedString(b?.ifscCode),
            swiftBicCode: persistedString(b?.swiftBicCode),
            sortCode: persistedString(b?.sortCode),
        };
    }, []);

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            enableReinitialize: true,
            onSubmit: (formValues) => {
                const prev = readPartnerOnboarding();
                setLocalItem(storageKeys.PARTNER_ONBOARDING_DETAILS, {
                    ...prev,
                    bankDetails: formValues,
                });
                router.push("/onboarding/partner/account-admin");
            },
            validationSchema: partnersBankDetailsSchema,
        });

    const inputFields = [
        {
            label: "Country",
            name: "country",
            placeholder: "Select Country",
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
            label: "Bank Name",
            name: "bankName",
            placeholder: "Enter Bank Name",
            required: true,
            className: "col-span-1",
            type: "text" as const,
            value: values.bankName,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage: errors.bankName && touched.bankName ? errors.bankName : "",
        },
        {
            label: "Account Number",
            name: "accountNumber",
            placeholder: "Enter Account Number",
            required: true,
            className: "col-span-1",
            type: "number" as const,
            value: values.accountNumber,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage:
                errors.accountNumber && touched.accountNumber
                    ? errors.accountNumber
                    : "",
        },
        {
            label: "IFSC Code",
            name: "ifscCode",
            placeholder: "Enter IFSC Code",
            required: true,
            className: "col-span-1",
            type: "text" as const,
            value: values.ifscCode,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage: errors.ifscCode && touched.ifscCode ? errors.ifscCode : "",
        },
        {
            label: "SWIFT / BIC Code",
            name: "swiftBicCode",
            placeholder: "Enter SWIFT/BIC Code",
            required: true,
            className: "col-span-1",
            type: "text" as const,
            value: values.swiftBicCode,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage:
                errors.swiftBicCode && touched.swiftBicCode ? errors.swiftBicCode : "",
        },
        {
            label: "Sort Code",
            name: "sortCode",
            placeholder: "Enter Sort Code",
            required: true,
            className: "col-span-1",
            type: "number" as const,
            value: values.sortCode,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage: errors.sortCode && touched.sortCode ? errors.sortCode : "",
        },
    ];
    return { inputFields, handleSubmit };
};

export default useHook;

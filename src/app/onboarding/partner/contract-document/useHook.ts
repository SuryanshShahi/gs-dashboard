import { partnersContractDocumentSchema } from "@/utils/schemas/partners";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { isStoredFileSnapshot, snapshotToFile } from "@/utils/fileSnapshot";
import { setLocalItem } from "@/utils/localstorage";
import { storageKeys } from "@/utils/enum";
import type { UploadFileChangeEvent } from "@/shared/input/UploadFile";
import { useEffect, useMemo } from "react";
import {
    fileSnapshotOrPersisted,
    persistedString,
    readPartnerOnboarding,
} from "../partnerOnboardingStorage";

type ContractDocumentFormValues = {
    gstin: string;
    pan: string;
    serviceAgreement: File | null;
    nonDisclosureAgreement: File | null;
    commissionStructure: File | null;
    paymentTerms: string;
};

const useHook = () => {
    const router = useRouter();
    const initialValues = useMemo((): ContractDocumentFormValues => {
        const c = readPartnerOnboarding().contractDocument;
        return {
            gstin: persistedString(c?.gstin),
            pan: persistedString(c?.pan),
            serviceAgreement: null,
            nonDisclosureAgreement: null,
            commissionStructure: null,
            paymentTerms: persistedString(c?.paymentTerms),
        };
    }, []);

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } =
        useFormik<ContractDocumentFormValues>({
            initialValues,
            enableReinitialize: true,
            onSubmit: async (submitted) => {
                const prev = readPartnerOnboarding();
                const cd = prev.contractDocument;
                const [serviceAgreement, nonDisclosureAgreement, commissionStructure] =
                    await Promise.all([
                        fileSnapshotOrPersisted(
                            submitted.serviceAgreement,
                            cd?.serviceAgreement,
                        ),
                        fileSnapshotOrPersisted(
                            submitted.nonDisclosureAgreement,
                            cd?.nonDisclosureAgreement,
                        ),
                        fileSnapshotOrPersisted(
                            submitted.commissionStructure,
                            cd?.commissionStructure,
                        ),
                    ]);
                const serializable = {
                    ...submitted,
                    serviceAgreement,
                    nonDisclosureAgreement,
                    commissionStructure,
                };
                setLocalItem(storageKeys.PARTNER_ONBOARDING_DETAILS, {
                    ...prev,
                    contractDocument: serializable,
                });
                router.push("/onboarding/partner/bank-details");
            },
            validationSchema: partnersContractDocumentSchema,
        });

    useEffect(() => {
        const c = readPartnerOnboarding().contractDocument;
        if (!c) return;
        if (isStoredFileSnapshot(c.serviceAgreement)) {
            setFieldValue(
                "serviceAgreement",
                snapshotToFile(c.serviceAgreement),
            );
        }
        if (isStoredFileSnapshot(c.nonDisclosureAgreement)) {
            setFieldValue(
                "nonDisclosureAgreement",
                snapshotToFile(c.nonDisclosureAgreement),
            );
        }
        if (isStoredFileSnapshot(c.commissionStructure)) {
            setFieldValue(
                "commissionStructure",
                snapshotToFile(c.commissionStructure),
            );
        }
    }, [setFieldValue]);


    const inputFields = [
        {
            label: "GSTIN",
            name: "gstin",
            placeholder: "Enter GSTIN",
            required: true,
            className: "col-span-1",
            type: "text" as const,
            value: values.gstin,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage: errors.gstin && touched.gstin ? errors.gstin : "",
            maxLength: 15,
        },
        {
            label: "PAN",
            name: "pan",
            placeholder: "Enter PAN",
            required: true,
            className: "col-span-1",
            type: "text" as const,
            value: values.pan,
            onChange: handleChange,
            onBlur: handleBlur,
            errorMessage: errors.pan && touched.pan ? errors.pan : "",
            maxLength: 10,
        },
        {
            label: "Service Agreement",
            name: "serviceAgreement",
            required: true,
            className: "col-span-2",
            type: "file" as const,
            variant: "document" as const,
            value: values.serviceAgreement,
            onChange: (e: UploadFileChangeEvent) => setFieldValue("serviceAgreement", e.target.value),
            onBlur: handleBlur,
            errorMessage:
                errors.serviceAgreement && touched.serviceAgreement
                    ? errors.serviceAgreement
                    : "",
        },
        {
            label: "Non-Disclosure Agreement",
            name: "nonDisclosureAgreement",
            subText: "Format: PDF • Max Size: 10MB",
            required: true,
            className: "col-span-2",
            type: "file" as const,
            variant: "document" as const,
            value: values.nonDisclosureAgreement,
            onChange: (e: UploadFileChangeEvent) => setFieldValue("nonDisclosureAgreement", e.target.value),
            onBlur: handleBlur,
            errorMessage:
                errors.nonDisclosureAgreement && touched.nonDisclosureAgreement
                    ? errors.nonDisclosureAgreement
                    : "",
        },
        {
            label: "Commission Structure",
            name: "commissionStructure",
            subText: "Format: PDF • Max Size: 10MB",
            required: true,
            className: "col-span-2",
            type: "file" as const,
            variant: "document" as const,
            value: values.commissionStructure,
            onChange: (e: UploadFileChangeEvent) =>
                setFieldValue("commissionStructure", e.target.value),
            onBlur: handleBlur,
            errorMessage:
                errors.commissionStructure && touched.commissionStructure
                    ? errors.commissionStructure
                    : "",
        },
    ];

    return { inputFields, handleSubmit };
};

export default useHook;

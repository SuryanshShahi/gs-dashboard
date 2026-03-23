import { getRms, onboardPartners } from "@/apis/apis";
import { storageKeys } from "@/utils/enum";
import { setLocalItem } from "@/utils/localstorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { partnersAccountAdminSchema } from "@/utils/schemas/partners";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { IOnboardPartners } from "@/apis/types";
import type { IOnboardingPartnerDetails } from "../types";
import {
    persistedFileName,
    persistedString,
    readPartnerOnboarding,
} from "../partnerOnboardingStorage";
import { PARTNER_ONBOARD_MUTATION_KEY } from "../mutationKeys";
import { showToast } from "@/shared/ToastMessage";

type AccountAdminFormValues = {
    firstName: string;
    middleName: string;
    lastName: string;
    adminEmail: string;
    adminPhoneNumber: string;
    designation: string;
    selectRm: string;
};

function buildOnboardPartnersPayload(
    details: Partial<IOnboardingPartnerDetails>,
    admin: AccountAdminFormValues,
): IOnboardPartners {
    const o = details.overview;
    const c = details.contractDocument;
    const b = details.bankDetails;

    return {
        companyName: o?.companyName ?? "",
        country: o?.country ?? "",
        registrationNumber: o?.registrationNumber ?? "",
        companyEmail: o?.email ?? "",
        phone: o?.phoneNumber ?? "",
        address: {
            line1: o?.companyAddress ?? "",
            line2: "",
            city: o?.city ?? "",
            state: o?.state ?? "",
            postalCode: o?.pincode ?? "",
            country: o?.country ?? "",
        },
        logoUrl: persistedFileName(o?.companyLogo),
        gstNumber: c?.gstin ?? "",
        panNumber: c?.pan ?? "",
        documents: [
            {
                docType: "service_agreement",
                label: "Service Agreement",
                fileUrl: persistedFileName(c?.serviceAgreement),
                fileName: persistedFileName(c?.serviceAgreement),
                fileSizeBytes: 0,
            },
            {
                docType: "non_disclosure_agreement",
                label: "Non-Disclosure Agreement",
                fileUrl: persistedFileName(c?.nonDisclosureAgreement),
                fileName: persistedFileName(c?.nonDisclosureAgreement),
                fileSizeBytes: 0,
            },
            {
                docType: "commission_structure",
                label: "Commission Structure",
                fileUrl: persistedFileName(c?.commissionStructure),
                fileName: persistedFileName(c?.commissionStructure),
                fileSizeBytes: 0,
            },
        ],
        bankDetail: {
            accountName: b?.bankName ?? "",
            accountNumber: b?.accountNumber ?? "",
            bankName: b?.bankName ?? "",
            branchName: b?.sortCode ?? "",
            ifscCode: b?.ifscCode ?? "",
            swiftCode: b?.swiftBicCode ?? "",
        },
        partnerAdmin: {
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.adminEmail,
            phone: admin.adminPhoneNumber,
            designation: admin.designation,
        },
        assignedRmId: admin.selectRm,
    };
}

const useHook = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutate: createPartner } = useMutation({
        mutationKey: [...PARTNER_ONBOARD_MUTATION_KEY],
        mutationFn: (data: IOnboardPartners) => onboardPartners(data),
        onSuccess: () => {
            router.replace("/partners");
            showToast({
                type: "success",
                title: "Partner onboarding successful!",
            });
            queryClient.invalidateQueries({ queryKey: ["partners"] });
        },
        onError: (err: any) => {
            showToast({
                type: "error",
                title: "Something went wrong!",
                subtitle: err?.response?.data?.message,
            });
        },
    });

    const { data: rms } = useQuery<
        {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string | null;
        }[]
    >({
        queryKey: ["rms"],
        queryFn: () => getRms(),
    });

    const initialValues = useMemo((): AccountAdminFormValues => {
        const a = readPartnerOnboarding().accountAdmin;
        return {
            firstName: persistedString(a?.firstName),
            middleName: persistedString(a?.middleName),
            lastName: persistedString(a?.lastName),
            adminEmail: persistedString(a?.adminEmail),
            adminPhoneNumber: persistedString(a?.adminPhoneNumber),
            designation: persistedString(a?.designation),
            selectRm: persistedString(a?.selectRm),
        };
    }, []);

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            enableReinitialize: true,
            onSubmit: (formValues) => {
                const details = readPartnerOnboarding();
                setLocalItem(storageKeys.PARTNER_ONBOARDING_DETAILS, {
                    ...details,
                    accountAdmin: formValues,
                });
                createPartner(
                    buildOnboardPartnersPayload(details, formValues),
                );
            },
            validationSchema: partnersAccountAdminSchema,
        });

    const inputFields = [
        {
            label: "Partner Admin",
            fields: [
                {
                    label: "First Name",
                    name: "firstName",
                    placeholder: "Enter First Name",
                    required: true,
                    className: "col-span-1",
                    type: "text",
                    value: values.firstName,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.firstName && touched.firstName ? errors.firstName : "",
                },
                {
                    label: "Middle Name",
                    name: "middleName",
                    placeholder: "Enter Middle Name",
                    className: "col-span-1",
                    type: "text",
                    value: values.middleName,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.middleName && touched.middleName ? errors.middleName : "",
                },
                {
                    label: "Last Name",
                    name: "lastName",
                    placeholder: "Enter Last Name",
                    required: true,
                    className: "col-span-1",
                    type: "text",
                    value: values.lastName,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.lastName && touched.lastName ? errors.lastName : "",
                },
                {
                    label: "Admin Email",
                    name: "adminEmail",
                    placeholder: "Enter Email",
                    required: true,
                    className: "col-span-1",
                    type: "email",
                    value: values.adminEmail,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.adminEmail && touched.adminEmail ? errors.adminEmail : "",
                },
                {
                    label: "Admin Phone Number",
                    name: "adminPhoneNumber",
                    placeholder: "Enter Phone Number",
                    required: true,
                    className: "col-span-1",
                    type: "number",
                    value: values.adminPhoneNumber,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.adminPhoneNumber && touched.adminPhoneNumber
                            ? errors.adminPhoneNumber
                            : "",
                },
                {
                    label: "Designation",
                    name: "designation",
                    placeholder: "Enter Designation",
                    required: true,
                    className: "col-span-1",
                    type: "text",
                    value: values.designation,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.designation && touched.designation ? errors.designation : "",
                },
            ],
        },
        {
            label: "Global Scholar Relationship Manager",
            fields: [
                {
                    label: "Select RM",
                    name: "selectRm",
                    placeholder: "Select RM",
                    required: true,
                    className: "col-span-1",
                    type: "select",
                    options: [
                        ...(rms?.map((rm) => ({
                            label: `${rm.firstName} ${rm.lastName}`,
                            value: rm.id,
                        })) ?? []),
                    ],
                    value: values.selectRm,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.selectRm && touched.selectRm ? errors.selectRm : "",
                },
            ],
        },
    ];
    return { inputFields, handleSubmit };
};

export default useHook;

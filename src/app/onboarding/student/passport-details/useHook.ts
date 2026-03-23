import { getPartners, getRms, onboardStudents } from "@/apis/apis";
import type { IOnboardStudents, StudentOnboardGender } from "@/apis/types";
import { showToast } from "@/shared/ToastMessage";
import { storageKeys } from "@/utils/enum";
import { setLocalItem } from "@/utils/localstorage";
import { studentPassportSchema } from "@/utils/schemas/students";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
    persistedFileName,
    persistedString,
} from "../../partner/partnerOnboardingStorage";
import { STUDENT_ONBOARD_MUTATION_KEY } from "@/app/onboarding/onboardingMutationKeys";
import { readStudentOnboarding } from "../studentOnboardingStorage";
import { countryLabelFromValue, type IOnboardingStudentDetails } from "../types";
import type { IPartner } from "@/features/partners/types";

type PassportFormValues = {
    passportNumber: string;
    passportExpiry: string;
    counsellorId: string;
    partnerId: string;
};

function mapGenderToApi(g: string): StudentOnboardGender {
    const v = g.toLowerCase();
    if (v === "male") return "MALE";
    if (v === "female") return "FEMALE";
    return "OTHER";
}

function buildOnboardStudentPayload(
    details: Partial<IOnboardingStudentDetails>,
    passport: PassportFormValues,
): IOnboardStudents {
    const p = details.personalDetails;
    const countryLabel = countryLabelFromValue(persistedString(p?.country));

    const firstName = [p?.firstName, p?.middleName]
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter(Boolean)
        .join(" ");

    return {
        firstName: firstName || persistedString(p?.firstName),
        lastName: persistedString(p?.lastName),
        dateOfBirth: persistedString(p?.dateOfBirth),
        gender: mapGenderToApi(persistedString(p?.gender)),
        nationality: countryLabel,
        countryOfResidence: countryLabel,
        personalEmail: persistedString(p?.personalEmail),
        phone: persistedString(p?.phone),
        whatsapp: persistedString(p?.whatsapp),
        address: {
            line1: persistedString(p?.addressLine1),
            line2: "",
            city: persistedString(p?.city),
            state: persistedString(p?.state),
            postalCode: persistedString(p?.pincode),
            country: countryLabel,
        },
        education: {},
        testScores: {},
        profilePhotoUrl: persistedFileName(p?.profilePhoto),
        passportNumber: passport.passportNumber.trim(),
        passportExpiry: passport.passportExpiry,
        counsellorId: passport.counsellorId,
        partnerId: passport.partnerId,
    };
}

const useHook = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: createStudent } = useMutation({
        mutationKey: [...STUDENT_ONBOARD_MUTATION_KEY],
        mutationFn: (data: IOnboardStudents) => onboardStudents(data),
        onSuccess: () => {
            setLocalItem(storageKeys.STUDENT_ONBOARDING_DETAILS, {});
            router.replace("/students");
            showToast({
                type: "success",
                title: "Student added successfully!",
            });
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
        onError: (err: unknown) => {
            const ax = err as {
                response?: { data?: { message?: string } };
                message?: string;
            };
            showToast({
                type: "error",
                title: "Something went wrong!",
                subtitle:
                    ax?.response?.data?.message ?? ax?.message ?? "Please try again.",
            });
        },
    });

    const { data: rms = [] } = useQuery({
        queryKey: ["rms"],
        queryFn: () => getRms(),
    });

    const { data: partners = [] } = useQuery({
        queryKey: ["partners"],
        queryFn: getPartners,
    });

    const initialValues = useMemo((): PassportFormValues => {
        const pd = readStudentOnboarding().passportDetails;
        return {
            passportNumber: persistedString(pd?.passportNumber),
            passportExpiry: persistedString(pd?.passportExpiry),
            counsellorId: persistedString(pd?.counsellorId),
            partnerId: persistedString(pd?.partnerId),
        };
    }, []);

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            enableReinitialize: true,
            onSubmit: (formValues) => {
                const details = readStudentOnboarding();
                setLocalItem(storageKeys.STUDENT_ONBOARDING_DETAILS, {
                    ...details,
                    passportDetails: formValues,
                });
                createStudent(buildOnboardStudentPayload(details, formValues));
            },
            validationSchema: studentPassportSchema,
        });

    const rmOptions = rms.map(
        (rm: { id: string; firstName: string; lastName: string }) => ({
            label: `${rm.firstName} ${rm.lastName}`,
            value: rm.id,
        }),
    );

    const partnerOptions = partners?.data?.map((p: IPartner) => ({
        label: p.companyName,
        value: p.id,
    })) ?? [];

    const inputFields = [
        {
            label: "Passport Details",
            fields: [
                {
                    label: "Passport Number",
                    name: "passportNumber",
                    placeholder: "Enter passport number",
                    required: true,
                    className: "col-span-1",
                    type: "text" as const,
                    value: values.passportNumber,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.passportNumber && touched.passportNumber
                            ? errors.passportNumber
                            : "",
                },
                {
                    label: "Passport Expiry",
                    name: "passportExpiry",
                    placeholder: "Select expiry date",
                    required: true,
                    className: "col-span-1",
                    type: "date" as const,
                    value: values.passportExpiry,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.passportExpiry && touched.passportExpiry
                            ? errors.passportExpiry
                            : "",
                },
            ],
        },
        {
            label: "Partner & Counsellor",
            fields: [
                {
                    label: "Partner",
                    name: "partnerId",
                    placeholder: "Select partner",
                    required: true,
                    className: "col-span-2",
                    type: "select" as const,
                    options: partnerOptions,
                    value: values.partnerId,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.partnerId && touched.partnerId ? errors.partnerId : "",
                },
                {
                    label: "Counsellor (RM)",
                    name: "counsellorId",
                    placeholder: "Select relationship manager",
                    required: true,
                    className: "col-span-2",
                    type: "select" as const,
                    options: rmOptions,
                    value: values.counsellorId,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errorMessage:
                        errors.counsellorId && touched.counsellorId
                            ? errors.counsellorId
                            : "",
                },
            ],
        },
    ];

    return { inputFields, handleSubmit };
};

export default useHook;

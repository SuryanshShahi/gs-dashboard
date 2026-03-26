import {
    addUniversity
} from "@/apis/apis";
import type { IDropdown } from "@/shared/input/Dropdown";
import type { IInputField } from "@/shared/input/InputField";
import { showToast } from "@/shared/ToastMessage";
import useCountries from "@/utils/hooks/useCountries";
import { addUniversitySchema } from "@/utils/schemas/masterData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";

export type AddUniversityFormValues = {
    name: string;
    country: string;
    state: string;
    city: string;
    type: string;
    qsRanking: string;
    website: string;
    status: "ACTIVE" | "INACTIVE";
};

export type AddUniversityInputField =
    | ({
        type: "select";
        className: string;
        options: NonNullable<IDropdown["options"]>;
        placeholder?: string;
    } & Omit<IDropdown, "options" | "type">)
    | ({ className: string } & IInputField);

const initialValues: AddUniversityFormValues = {
    name: "",
    country: "",
    state: "",
    city: "",
    type: "",
    qsRanking: "",
    website: "",
    status: "ACTIVE",
};

const useHook = ({ close }: { close: () => void }) => {
    const queryClient = useQueryClient();
    const { mutate: addUniversityMutation, isPending } = useMutation({
        mutationFn: addUniversity,
        onSuccess: () => {
            formik.resetForm();
            queryClient.invalidateQueries({ queryKey: ["universities"] });
            showToast({
                type: "success",
                title: "University added successfully.",
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

    const formik = useFormik<AddUniversityFormValues>({
        initialValues,
        validationSchema: addUniversitySchema,
        validateOnMount: true,
        onSubmit: (values) => {
            addUniversityMutation({
                name: values.name.trim(),
                country: values.country,
                city: values.city,
                type: values.type,
                qsRanking: values.qsRanking ? Number(values.qsRanking) : undefined,
                website: values.website.trim() || undefined,
                isActive: values.status === "ACTIVE",
            });
        },
    });

    const { countriesOptions, statesOptions, citiesOptions } = useCountries({
        country: formik.values.country,
        state: formik.values.state,
    });

    const showError = (field: keyof AddUniversityFormValues) =>
        formik.errors[field] && (formik.touched[field] || formik.submitCount > 0)
            ? formik.errors[field]
            : "";

    const isSubmitDisabled = Object.keys(formik.errors).length > 0;

    const inputFields = [
        {
            className: "col-span-2",
            label: "University Name",
            required: true,
            name: "name",
            type: "text",
            placeholder: "e.g. University of Manchester",
            value: formik.values.name,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            errorMessage: showError("name"),
        },
        {
            className: "col-span-1",
            label: "Country",
            required: true,
            name: "country",
            type: "select",
            value: formik.values.country,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            options: countriesOptions,
            placeholder: "Select country",
            errorMessage: showError("country"),
        },
        {
            className: "col-span-1",
            label: "State",
            required: true,
            name: "state",
            type: "select",
            placeholder: "e.g. California",
            value: formik.values.state,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            options: statesOptions,
            errorMessage: showError("state"),
        },
        {
            className: "col-span-1",
            label: "City",
            required: true,
            name: "city",
            type: "select",
            placeholder: "e.g. London",
            value: formik.values.city,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            options: citiesOptions,
            errorMessage: showError("city"),
        },
        {
            className: "col-span-1",
            label: "Type",
            required: true,
            name: "type",
            type: "select",
            value: formik.values.type,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            options: [
                { label: "Public", value: "Public" },
                { label: "Private", value: "Private" },
            ],
            placeholder: "Select type",
            errorMessage: showError("type"),
        },
        {
            className: "col-span-1",
            label: "QS World Ranking",
            name: "qsRanking",
            type: "number",
            min: 1,
            placeholder: "e.g. 32",
            value: formik.values.qsRanking,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            errorMessage: showError("qsRanking"),
        },
        {
            className: "col-span-1",
            label: "Website",
            name: "website",
            type: "text",
            placeholder: "e.g. university.ac.uk",
            value: formik.values.website,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            errorMessage: showError("website"),
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

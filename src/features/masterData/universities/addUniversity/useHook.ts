import { addUniversity, getCountries, updateUniversity } from "@/apis/apis";
import type { ICountry } from "@/features/masterData/countries/types";
import type { IDropdown } from "@/shared/input/Dropdown";
import type { IInputField } from "@/shared/input/InputField";
import { showToast } from "@/shared/ToastMessage";
import useCountries from "@/utils/hooks/useCountries";
import { addUniversitySchema } from "@/utils/schemas/masterData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useMemo, useRef } from "react";
import { IUpdateUniversity, UniversityTableRow } from "../types";

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

const defaultFormValues: AddUniversityFormValues = {
    name: "",
    country: "",
    state: "",
    city: "",
    type: "",
    qsRanking: "",
    website: "",
    status: "ACTIVE",
};

const useHook = ({
    close,
    selectedUniversity,
}: {
    close: () => void;
    selectedUniversity: UniversityTableRow | null;
}) => {
    const queryClient = useQueryClient();
    const formikRef = useRef<ReturnType<typeof useFormik<AddUniversityFormValues>> | null>(
        null,
    );

    const { data: countries } = useQuery<ICountry[]>({
        queryKey: ["countries"],
        queryFn: getCountries,
    });

    const resolvedCountryId = useMemo(() => {
        const list = Array.isArray(countries) ? countries : [];
        if (!selectedUniversity || !list.length) return "";
        const raw = selectedUniversity.countryName?.trim();
        if (!raw) return "";
        const byName = list.find((c) => c.name === raw);
        if (byName) return byName.id;
        return list.find((c) => c.id === raw)?.id ?? "";
    }, [selectedUniversity, countries]);

    const formInitialValues = useMemo<AddUniversityFormValues>(() => {
        if (!selectedUniversity) {
            return { ...defaultFormValues };
        }
        return {
            name: selectedUniversity.name,
            country: resolvedCountryId,
            state: "",
            city: "",
            type: selectedUniversity.type,
            qsRanking:
                selectedUniversity.qsRanking > 0
                    ? String(selectedUniversity.qsRanking)
                    : "",
            website: selectedUniversity.website ?? "",
            status: selectedUniversity.status,
        };
    }, [selectedUniversity, resolvedCountryId]);

    const { mutate: addUniversityMutation, isPending } = useMutation({
        mutationFn: addUniversity,
        onSuccess: () => {
            formikRef.current?.resetForm();
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
    const {
        mutate: updateUniversityMutation,
        isPending: isUpdateUniversityPending,
    } = useMutation({
        mutationFn: ({
            universityId,
            payload,
        }: {
            universityId: string;
            payload: IUpdateUniversity;
        }) => updateUniversity(universityId, payload),
        onSuccess: () => {
            formikRef.current?.resetForm();
            queryClient.invalidateQueries({ queryKey: ["universities"] });
            showToast({
                type: "success",
                title: "University details updated successfully.",
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
        initialValues: formInitialValues,
        enableReinitialize: true,
        validationSchema: addUniversitySchema,
        validateOnMount: true,
        onSubmit: (values) => {
            const payload: IUpdateUniversity = {
                name: values.name.trim(),
                country: Number(values.country),
                city: Number(values.city),
                type: values.type,
                qsRanking: values.qsRanking
                    ? Number(values.qsRanking)
                    : undefined,
                website: values.website.trim() || undefined,
                isActive: values.status === "ACTIVE",
            };
            if (selectedUniversity) {
                updateUniversityMutation({
                    universityId: selectedUniversity.id,
                    payload,
                });
            } else {
                addUniversityMutation({
                    name: payload.name!,
                    countryId: Number(payload.country!),
                    cityId: Number(payload.city),
                    type: payload.type,
                    qsRanking: payload.qsRanking,
                    website: payload.website,
                    isActive: payload.isActive ?? true,
                });
            }
        },
    });

    formikRef.current = formik;

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
        updateUniversityMutation,
        isUpdateUniversityPending,
    };
};

export default useHook;

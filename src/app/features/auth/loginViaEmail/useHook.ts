import { loginSchema } from "@/utils/schemas/login";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const useHook = () => {
    const router = useRouter();
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log(values)
            router.push("/enter-otp")
        }
    })
    const isBtnDisabled = Object.keys(errors).length > 0 || !values.email;
    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isBtnDisabled,
    }
}

export default useHook
import { loginSchema } from "@/utils/schemas/login";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "@/apis/apis";
import { setLocalItem } from "@/utils/localstorage";
import { storageKeys } from "@/utils/enum";

const useHook = () => {
    const router = useRouter();
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log(values)
            mutate(values)
        }
    })
    const { mutate ,isPending} = useMutation({
        mutationFn: sendOtp,
        onSuccess: (res) => {
            setLocalItem(storageKeys.LOGIN_DETAILS, { email: values.email, otpId: res.id })
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
        isPending,
    }
}

export default useHook
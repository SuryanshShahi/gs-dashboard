import { resendOtp, verifyOtp } from "@/apis/apis";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getLocalItem, removeLocalItem } from "@/utils/localstorage";
import { storageKeys } from "@/utils/enum";
import { setCookie } from "@/utils/cookies";

interface ILoginDetails {
    email: string;
}

/** Matches login API + cookies read by `authRefresh` / `axiosInstance` */
interface IOtpLoginSuccess {
    accessToken: string;
    refreshToken?: string;
}

const useHook = () => {
    const router = useRouter();
    const { email } = getLocalItem<ILoginDetails>(storageKeys.LOGIN_DETAILS) ?? {
        email: "",
    };
    const [otp, setOtp] = useState("");
    const { mutate: verifyOtpMutation, isPending } = useMutation({
        mutationFn: () => verifyOtp({ email, otp }),
        onSuccess: (res: IOtpLoginSuccess) => {
            if (!res?.accessToken) return;

            setCookie(storageKeys.ACCESS_TOKEN, res.accessToken);
            // Same cookie name as `getRefreshTokenString()` in `@/apis/authRefresh`
            if (res.refreshToken) {
                setCookie(storageKeys.REFRESH_TOKEN, res.refreshToken);
            }
            router.push("/overview");
            removeLocalItem(storageKeys.LOGIN_DETAILS);
        },
    });
    const { mutate: resendOtpMutation } = useMutation({
        mutationFn: () => resendOtp({ email }),
        onSuccess: () => {
            setOtp("");
        },
    });
    return {
        otp,
        setOtp,
        verifyOtpMutation,
        email,
        resendOtpMutation,
        isPending,
    };
};

export default useHook;

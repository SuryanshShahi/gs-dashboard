"use client";
import Button from "@/shared/buttons/Button";
import Text from "@/shared/heading/Text";
import OtpInputField from "@/shared/input/OtpInput";
import { FiArrowRight } from "react-icons/fi";
import useHook from "./useHook";

const EnterOtp = () => {
  const {
    otp,
    setOtp,
    verifyOtpMutation,
    email,
    resendOtpMutation,
    isPending,
  } = useHook();
  return (
    <div className="space-y-10 max-w-[400px] mx-auto mt-10">
      <div className="flex flex-col items-center gap-y-2">
        <Text type="bold" size="4xl">
          Enter OTP
        </Text>
        <div>
          <Text type="medium" size="lg" variant="secondary">
            Enter the OTP sent to your email
          </Text>
          <Text type="medium" size="lg" variant="brand">
            {email}
          </Text>
        </div>
      </div>
      <div className="space-y-6">
        <OtpInputField
          otp={otp}
          setOtp={(otp) => setOtp(otp)}
          errorMessage=""
          className="flex flex-col items-center"
          resend={() => resendOtpMutation()}
        />
        <Button
          btnName="Continue"
          variant="primary"
          fullWidth
          onClick={() => verifyOtpMutation()}
          isLoading={isPending}
          icon={<FiArrowRight className="w-5 h-5" />}
        />
      </div>
    </div>
  );
};

export default EnterOtp;

"use client";
import Button from "@/shared/buttons/Button";
import Text from "@/shared/heading/Text";
import InputField from "@/shared/input/InputField";
import { FiArrowRight } from "react-icons/fi";
import useHook from "./useHook";

const LoginViaEmail = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isBtnDisabled,
  } = useHook();

  return (
    <div className="space-y-10 max-w-[500px] w-full mx-auto mt-10">
      <div className="flex flex-col items-center gap-y-2">
        <Text
          type="bold"
          size="4xl"
          className="text-center sm:text-4xl text-2xl"
        >
          Sign in to your Account
        </Text>
        <Text
          type="medium"
          size="lg"
          variant="secondary"
          className="text-center sm:text-lg text-base"
        >
          Enter your email to log in
        </Text>
      </div>
      <div className="space-y-6">
        <InputField
          label="Email"
          placeholder="Enter your email"
          type="email"
          name="email"
          className="w-full"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={touched.email && errors.email ? errors.email : ""}
        />
        <Button
          btnName="Continue"
          variant="primary"
          onClick={() => handleSubmit()}
          fullWidth
          disabled={isBtnDisabled}
          icon={<FiArrowRight className="w-5 h-5" />}
        />
      </div>
    </div>
  );
};

export default LoginViaEmail;

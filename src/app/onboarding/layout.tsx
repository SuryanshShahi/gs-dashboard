"use client";
import { PARTNER_ONBOARD_MUTATION_KEY } from "@/app/onboarding/partner/mutationKeys";
import Img from "@/shared/Img";
import Button from "@/shared/buttons/Button";
import { useIsMutating } from "@tanstack/react-query";
import { FiArrowLeft, FiArrowRight, FiCheck, FiX } from "react-icons/fi";
import {
  LuClipboardList,
  LuFileText,
  LuLandmark,
  LuUser,
  LuUserPlus,
} from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import InfoCluster from "@/shared/InfoCluster";

const onboardingSteps = {
  partner: [
    {
      title: "Overview",
      description: "Create your account or log in to start.",
      icon: LuClipboardList,
      path: "/onboarding/partner/overview",
    },
    {
      title: "Contracts & Documents",
      description: "Verify your email with the code sent to your inbox.",
      icon: LuFileText,
      path: "/onboarding/partner/contract-document",
    },
    {
      title: "Bank Details",
      description: "Verify your email with the code sent to your inbox.",
      icon: LuLandmark,
      path: "/onboarding/partner/bank-details",
    },
    {
      title: "Account Admin",
      description: "Securely complete your payment to activate the plan.",
      icon: LuUserPlus,
      path: "/onboarding/partner/account-admin",
    },
  ],
  team: [
    {
      title: "Personal Details",
      description: "Create your account or log in to start.",
      icon: LuClipboardList,
      path: "/onboarding/team/personal-details",
    },
    {
      title: "Documents & Emergency Contact",
      description: "Verify your email with the code sent to your inbox.",
      icon: LuFileText,
      path: "/onboarding/team/emergency-contact",
    },
  ],
  student: [
    {
      title: "Personal Details",
      description: "Create your account or log in to start.",
      icon: LuClipboardList,
      path: "/onboarding/student/personal-details",
    },
    {
      title: "Passport Details & Counsellor",
      description: "Upload your passport details and assign a counsellor.",
      icon: LuUser,
      path: "/onboarding/student/passport-details",
    },
  ],
};
export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const partnerOnboardMutating =
    useIsMutating({ mutationKey: [...PARTNER_ONBOARD_MUTATION_KEY] }) > 0;
  const finishPartnerLoading =
    pathname === "/onboarding/partner/account-admin" &&
    partnerOnboardMutating;
  const type = pathname.split("/")[2] as keyof typeof onboardingSteps;
  const steps = onboardingSteps[type] ?? onboardingSteps.partner;
  const activeStep = steps.findIndex((step) => pathname === step.path);
  const isFirstStep = activeStep <= 0;
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (pathname === "/onboarding/partner/overview") {
      const overviewForm = document.getElementById(
        "partner-overview-form",
      ) as HTMLFormElement | null;
      overviewForm?.requestSubmit();
      return;
    }
    if (pathname === "/onboarding/partner/contract-document") {
      const contractForm = document.getElementById(
        "partner-contract-document-form",
      ) as HTMLFormElement | null;
      contractForm?.requestSubmit();
      return;
    }
    if (pathname === "/onboarding/partner/bank-details") {
      const bankDetailsForm = document.getElementById(
        "partner-bank-details-form",
      ) as HTMLFormElement | null;
      bankDetailsForm?.requestSubmit();
      return;
    }
    if (pathname === "/onboarding/partner/account-admin") {
      const accountAdminForm = document.getElementById(
        "partner-account-admin-form",
      ) as HTMLFormElement | null;
      accountAdminForm?.requestSubmit();
      return;
    }

    if (!isLastStep) {
      router.push(steps[activeStep + 1].path);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      router.push(steps[activeStep - 1].path);
    } else {
      router.back();
    }
  };

  const handleCancel = () => {
    if (type === "student") router.push("/students");
    else if (type === "team") router.push("/teams");
    else router.push("/partners");
  };

  return (
    <div className="flex h-screen bg-white pt-4 px-4 gap-6">
      <div className="max-w-[450px] w-full bg-onboardingBg rounded-2xl mb-4 p-8 flex flex-col shrink-0 gap-y-6">
        <Img
          src="/assets/icons/logo-white.png"
          height={32}
          width={160}
          alt="logo"
          isLocal
          className="max-h-8 object-contain"
        />
        <InfoCluster
          titleProps={{
            children:
              type === "team"
                ? "Onboard New Team Member"
                : type === "student"
                  ? "Add New Student"
                  : "Onboard New Partner",
            variant: "white",
            size: "2xl",
          }}
          descriptionProps={{
            children:
              type === "team"
                ? "Get started and onboard your new team member"
                : type === "student"
                  ? "Get started and add your new student"
                  : "Get started and onboard your new partner agency",
            variant: "text-neutral-100",
            size: "sm",
          }}
        />
        <div className="flex flex-col mt-6">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;
            const isHighlighted = isActive || isCompleted;
            const Icon = step.icon;
            return (
              <InfoCluster
                key={step.path}
                className="items-start"
                children={
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div
                        className={clsx(
                          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                          isActive
                            ? "bg-white border border-white"
                            : isCompleted
                              ? "bg-white/20 border border-white/40"
                              : "bg-white/5 border border-white/10",
                        )}
                      >
                        <Icon
                          className={clsx(
                            "w-5 h-5",
                            isActive
                              ? "text-[var(--brand-800)]"
                              : isCompleted
                                ? "text-white"
                                : "text-white/40",
                          )}
                        />
                      </div>
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-[var(--brand-800)]">
                          <FiCheck
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-px flex-1 min-h-8 border-l border-dashed border-white/20 my-2" />
                    )}
                  </div>
                }
                titleProps={{
                  children: step.title,
                  variant: isHighlighted ? "white" : "text-white/50",
                  size: "base",
                }}
                descriptionProps={{
                  children: step.description,
                  variant: isHighlighted ? "text-neutral-100" : "text-white/50",
                  size: "xs",
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-white flex flex-col min-h-0 overflow-hidden relative">
        <Button
          onClick={handleBack}
          icon={<FiArrowLeft size={20} className="text-gray-600" />}
          variant="secondary"
          className="!h-12 !w-12 mt-6 !border-gray-200"
        />

        <div className="flex-1 overflow-y-auto pb-24">{children}</div>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between backdrop-blur-xs bg-gray-100/40 shadow-lg shadow-neutral-500 rounded-t-2xl">
          <Button
            variant="secondary"
            size="md"
            btnName="Cancel"
            icon={<FiX className="w-4 h-4" />}
            iconFirst
            className="!border-gray-200"
            onClick={handleCancel}
          />
          <div className="flex items-center gap-3">
            {!isFirstStep && (
              <Button
                variant="secondary"
                size="md"
                btnName="Back"
                icon={<FiArrowLeft className="w-4 h-4" />}
                iconFirst
                className="!border-gray-200"
                onClick={handleBack}
              />
            )}
            <Button
              variant="primary"
              size="md"
              btnName={isLastStep ? "Finish" : "Next"}
              icon={isLastStep ? null : <FiArrowRight className="w-4 h-4" />}
              onClick={handleNext}
              isLoading={isLastStep && finishPartnerLoading}
              disabled={isLastStep && finishPartnerLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

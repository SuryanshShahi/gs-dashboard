import { storageKeys } from "@/utils/enum";
import { getLocalItem } from "@/utils/localstorage";
import type { IOnboardingStudentDetails } from "./types";

export function readStudentOnboarding(): Partial<IOnboardingStudentDetails> {
  return (
    getLocalItem<Partial<IOnboardingStudentDetails>>(
      storageKeys.STUDENT_ONBOARDING_DETAILS,
    ) ?? {}
  );
}

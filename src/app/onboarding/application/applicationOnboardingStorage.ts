import { storageKeys } from "@/utils/enum";
import { getLocalItem, setLocalItem } from "@/utils/localstorage";
import type { IApplicationOnboarding } from "./types";

export function readApplicationOnboarding(): Partial<IApplicationOnboarding> {
  return (
    getLocalItem<Partial<IApplicationOnboarding>>(
      storageKeys.APPLICATION_ONBOARDING_DETAILS,
    ) ?? {}
  );
}

export function writeApplicationOnboarding(
  next: Partial<IApplicationOnboarding>,
) {
  const prev = readApplicationOnboarding();
  setLocalItem(storageKeys.APPLICATION_ONBOARDING_DETAILS, {
    ...prev,
    ...next,
  });
}

export function clearApplicationOnboarding() {
  setLocalItem(storageKeys.APPLICATION_ONBOARDING_DETAILS, {});
}

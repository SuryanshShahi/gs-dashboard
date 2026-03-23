import { storageKeys } from "@/utils/enum";
import {
  fileToSnapshot,
  isStoredFileSnapshot,
  snapshotFileName,
  type StoredFileSnapshot,
} from "@/utils/fileSnapshot";
import { getLocalItem } from "@/utils/localstorage";
import type { IOnboardingPartnerDetails } from "./types";

export function readPartnerOnboarding(): Partial<IOnboardingPartnerDetails> {
  return (
    getLocalItem<Partial<IOnboardingPartnerDetails>>(
      storageKeys.PARTNER_ONBOARDING_DETAILS,
    ) ?? {}
  );
}

/** Normalize stored values for Formik text/number inputs (LS may deserialize numbers). */
export function persistedString(value: unknown): string {
  if (typeof value === "string" && value.trim().length > 0) return value;
  if (typeof value === "number" && !Number.isNaN(value)) return String(value);
  return "";
}

export function fileNameOrPersisted(
  file: File | null,
  previous: unknown,
): string {
  if (file instanceof File) return file.name;
  return persistedString(previous);
}

export async function fileSnapshotOrPersisted(
  file: File | null,
  previous: unknown,
): Promise<string | StoredFileSnapshot> {
  if (file instanceof File) {
    return fileToSnapshot(file);
  }
  if (isStoredFileSnapshot(previous)) return previous;
  return persistedString(previous);
}

export function persistedFileName(value: unknown): string {
  if (typeof value === "string") return persistedString(value);
  return snapshotFileName(value);
}

import { useSearchParams } from "next/navigation";
import { localStorageKeys } from "../enum";
import { getLocalItem } from "../localstorage";

export default function useSharedVariables() {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const deviceId =
    getLocalItem<string>(localStorageKeys.REGISTERED_DEVICE_ID) || "";
  return {
    queryParams,
    deviceId,
  };
}

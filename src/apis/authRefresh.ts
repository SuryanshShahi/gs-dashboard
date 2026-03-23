import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { storageKeys } from "@/utils/enum";
import { decodeToken } from "@/utils/functions";
import { getLocalItem, setLocalItem } from "@/utils/localstorage";
import { API_CONSTANTS } from "./apiConstants";

function getAccessTokenString(): string | null {
  const t = getCookie(storageKeys.ACCESS_TOKEN);
  if (t == null) return null;
  if (typeof t === "string") return t;
  if (typeof t === "object" && t !== null && "accessToken" in t) {
    return String((t as { accessToken?: string }).accessToken ?? "");
  }
  return null;
}

function getRefreshTokenString(): string | null {
  const t = getCookie(storageKeys.REFRESH_TOKEN);
  if (t == null) return null;
  if (typeof t === "string") return t;
  if (typeof t === "object" && t !== null && "refreshToken" in t) {
    return String((t as { refreshToken?: string }).refreshToken ?? "");
  }
  return String(t);
}

function getOrCreateDeviceId(): string {
  let id = getLocalItem<string>(storageKeys.DEVICE_ID);
  if (id) return id;
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    id = crypto.randomUUID();
    setLocalItem(storageKeys.DEVICE_ID, id);
    return id;
  }
  return "";
}

/**
 * Calls POST /v1/auth/refresh with refresh token + metadata.
 * Uses raw axios (not axiosInstance) to avoid interceptor recursion.
 */
export async function refreshAccessTokenRequest(): Promise<{
  accessToken: string;
  refreshToken?: string;
} | null> {
  const refreshTokenValue = getRefreshTokenString();
  if (!refreshTokenValue) {
    console.warn("[auth] No refresh_token cookie; cannot refresh");
    return null;
  }

  const accessToken = getAccessTokenString();
  const decoded = accessToken ? decodeToken(accessToken) : null;
  const identityId =
    decoded &&
    typeof decoded === "object" &&
    decoded !== null &&
    "identity" in decoded
      ? String(
          (decoded as { identity?: { id?: string } }).identity?.id ?? "",
        )
      : "";

  const deviceIdentifier = getOrCreateDeviceId();

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    console.error("[auth] NEXT_PUBLIC_API_URL is not set");
    return null;
  }

  // Backend must receive token in body — cookies on localhost are NOT sent to the API host.
  const res = await axios.post(
    `${baseURL}${API_CONSTANTS.refreshToken}`,
    {
      deviceIdentifier,
      refreshToken: refreshTokenValue,
      identityId,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "server",
      },
    },
  );

  const data = res?.data?.data;
  if (!data?.accessToken) return null;
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
}

"use client";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
// import useFirebase from "../utils/hooks/useFirebase";
import { getLocalItem, setLocalItem } from "@/utils/localstorage";
import { localStorageKeys } from "@/utils/enum";
export interface IRegisterDevice {
  mode: string;
  identifier: string;
  notificationToken?: string;
}

// Optimized QueryClient for development
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Faster refetching in development
      staleTime:
        process.env.NODE_ENV === "development" ? 1000 * 60 * 5 : 1000 * 60 * 10, // 5 min in dev, 10 min in prod
      gcTime:
        process.env.NODE_ENV === "development"
          ? 1000 * 60 * 10
          : 1000 * 60 * 15, // 10 min in dev, 15 min in prod
      // Reduce unnecessary refetches in development
      refetchOnWindowFocus:
        process.env.NODE_ENV === "development" ? false : true,
      refetchOnReconnect: process.env.NODE_ENV === "development" ? false : true,
    },
    mutations: {
      retry: process.env.NODE_ENV === "development" ? 1 : 3,
    },
  },
});

const ReactQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  // const { getFCMToken } = useFirebase(queryClient);

  // const register = async () => {
  //   const id = getLocalItem(localStorageKeys.REGISTERED_DEVICE_ID);
  //   const notificationToken = await getFCMToken();
  //   if (!id) {
  //     const deviceId = (await (await FingerprintJS.load()).get()).visitorId;
  //     setLocalItem(localStorageKeys.DEVICE_ID, deviceId);
  //     const res = await registerDevice({
  //       identifier: deviceId,
  //       mode: "employee_web",
  //       notificationToken: notificationToken ?? undefined,
  //     });
  //     setLocalItem(localStorageKeys.REGISTERED_DEVICE_ID, res?.id);
  //     setData((p) => ({ ...p, deviceId: res?.id }));
  //   } else {
  //     setData((p) => ({ ...p, deviceId: id as string }));
  //   }
  // };

  // useEffect(() => {
  //   register();
  // }, []);

  const contextValue = useMemo(() => ({ data, setData }), [data, setData]);
  return (
    <QueryClientProvider client={queryClient}>
      {/* <GlobalContext.Provider value={contextValue}> */}
      {children}
      {/* </GlobalContext.Provider> */}
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;

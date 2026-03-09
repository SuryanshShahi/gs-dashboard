"use client";
import { getEmpInfo } from "@/app/apis/apis";
import { GlobalContext } from "@/app/contexts";
import { IEmpInfo } from "@/app/features/auth/types";
import Button from "@/app/shared/buttons/Button";
import CardWrapper from "@/app/shared/cards/CardWrapper";
import DownloadApp from "@/app/shared/cards/DownloadApp";
import UserCard from "@/app/shared/cards/UserCard";
import Divider from "@/app/shared/Divider";
import Heading from "@/app/shared/Heading";
import Img from "@/app/shared/Img";
import ConfirmationModal from "@/app/shared/modal/ConfirmationModal";
import { SvgCross, SvgLogout } from "@/app/svgs";
import { getCookie, removeCookie } from "@/app/utils/Cookies";
import { localStorageKeys } from "@/app/utils/enum";
import useGetImageUrls from "@/app/utils/hooks/useGetImageUrls";
import useSharedVariables from "@/app/utils/hooks/useSharedVariables";
import useWindowDimensions from "@/app/utils/hooks/useWindowDimension";
import {
  clearLocalStorageExcept
} from "@/app/utils/localstorage";
import { drawerMenuItems } from "@/app/utils/static";
import { tw } from "@/tailwind.config";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SideBar = ({
  className,
  close,
}: {
  className?: string;
  close?: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = pathname.split("/")?.splice(1);
  const [isOpen, setIsOpen] = useState("");

  const { width } = useWindowDimensions();
  const { siteDetails, isVisitorLogin } = useSharedVariables();
  const { setData } = useContext(GlobalContext);

  const drawerItems = drawerMenuItems(getCookie("allowedModules") || []);
  const checkIfMenuItems = () =>
    Boolean(
      drawerItems?.find(
        (e) =>
          e.key === routes?.[0] ||
          e?.menuItems?.map((r) => r.key).includes(routes?.[0])
      )?.menuItems
    );

  const [showItems, setShowItems] = useState(checkIfMenuItems);

  const { data: empDetails } = useQuery<IEmpInfo>({
    queryKey: ["empDetails"],
    queryFn: getEmpInfo,
    enabled: !isVisitorLogin,
  });
  const assetIds = useMemo(
    () => (empDetails?.photoId ? [empDetails?.photoId] : []),
    [empDetails]
  );
  const { images } = useGetImageUrls(assetIds);
  useEffect(() => {
    setData((p) => ({
      ...p,
      empDetails: { ...empDetails, image: images?.[0]?.url },
    }));
  }, [empDetails, images]);

  return (
    <>
      <CardWrapper
        className={clsx(
          "md:py-6 py-4 px-0 space-y-4 w-full max-w-[312px] my-auto lg:h-[calc(100vh-64px)] md:h[calc(100vh-32px)] h-full flex flex-col",
          className
        )}
      >
        <div className="flex justify-between items-center px-6">
          <Link href="/home" className="flex items-center gap-x-2">
            {siteDetails?.logo && (
              <Img
                height={32}
                width={47}
                alt=""
                src={siteDetails?.logo || ""}
                className="max-h-8"
                isLocal
              />
            )}
            <Heading
              type="semibold"
              className="text-xl line-clamp-1"
              variant="primary"
            >
              {siteDetails?.name}
            </Heading>
          </Link>
          {Number(width) <= 1024 && (
            <SvgCross
              height={26}
              width={26}
              onClick={close}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
              stroke="black"
              className="cursor-pointer"
            />
          )}
        </div>
        <Divider />
        <div className="space-y-2 px-4 overflow-y-scroll">
          {drawerItems?.map((item, idx) => {
            let iconColor = "";
            if (!item?.menuItems && pathname.includes(item.key)) {
              iconColor = tw?.textColor["brand-secondary"];
            } else if (item.disabled) {
              iconColor = tw?.textColor["disabled"];
            }
            return (
              <Fragment key={item?.title + idx}>
                <Button
                  key={item?.title + idx}
                  btnName={item?.title}
                  variant={
                    !item?.menuItems && pathname.includes(item.key)
                      ? "tertiary-color"
                      : "tertiary"
                  }
                  icon={item?.icon(iconColor)}
                  iconFirst
                  fullWidth
                  className={clsx(
                    "!justify-start !gap-x-3 !font-medium",
                    !item?.menuItems &&
                      pathname.includes(item.key) &&
                      "!text-brand-secondary bg-btn-tertiary-hover"
                  )}
                  onClick={
                    item?.menuItems
                      ? () => setShowItems(!showItems)
                      : () => {
                          close?.();
                          router.push(`/${item.key}`);
                        }
                  }
                  disabled={item?.disabled}
                  secondaryIcon={
                    item?.menuItems && (
                      <IoIosArrowDown
                        size={14}
                        className={clsx(
                          "order-last ml-auto duration-300",
                          showItems && "rotate-180"
                        )}
                      />
                    )
                  }
                />
                {showItems && (
                  <div className="space-y-1">
                    {item?.menuItems?.map((item1, idx1) => (
                      <Button
                        key={item1?.title + idx1}
                        btnName={item1.title}
                        variant={
                          pathname.includes(item1.key)
                            ? "tertiary-color"
                            : "tertiary"
                        }
                        fullWidth
                        className={clsx(
                          "!justify-start animate-slide !pl-[50px] !font-medium",
                          pathname.includes(item1.key) &&
                            "!text-brand-secondary bg-btn-tertiary-hover"
                        )}
                        onClick={() => {
                          close?.();
                          router.push(`/${item1.key}`);
                        }}
                        // disabled={item1.disabled}
                      />
                    ))}
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
        <div className="space-y-4 !mt-auto pt-4">
          <Divider />
          <DownloadApp />
          <UserCard
            title={empDetails?.name || "You"}
            subtitle={
              empDetails?.upin
                ? "U" + empDetails?.upin + " • " + empDetails?.organizationName
                : ""
            }
            styleSubtitle="!text-xs !text-tertiary"
            image={images?.[0]?.url}
            showInitials
            className="px-6"
            onClick={() => {
              !isVisitorLogin && router.push("/profile");
              close?.();
            }}
          >
            <SvgLogout
              stroke={tw.textColor["secondary"]}
              className="ml-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen("LOGOUT_MODAL");
              }}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            />
          </UserCard>
        </div>
      </CardWrapper>
      <ConfirmationModal
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        onSubmit={() => {
          setIsOpen("LOADING");
          removeCookie("token");
          removeCookie("locationDetails");
          removeCookie("allowedModules");
          removeCookie("isVisitorLogin");
          clearLocalStorageExcept([
            localStorageKeys.DEVICE_ID,
            localStorageKeys.REGISTERED_DEVICE_ID,
            localStorageKeys.SITE_DETAILS,
          ]);
          router.push("/auth/login");
        }}
        styleHeader="flex gap-x-4 !space-y-0"
        rightBtnName="Yes, Logout"
        leftBtnName="Back"
        type="danger"
        isOpen={isOpen === "LOGOUT_MODAL"}
        size="md"
        isLoading={isOpen === "LOADING"}
        close={() => setIsOpen("")}
      />
    </>
  );
};

export default SideBar;

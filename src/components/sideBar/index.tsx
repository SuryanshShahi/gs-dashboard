"use client";
import Button from "@/shared/buttons/Button";
import Text from "@/shared/heading/Text";
import Img from "@/shared/Img";
import ConfirmationModal from "@/shared/modal/ConfirmationModal";
import useWindowDimensions from "@/utils/hooks/useWindowDimension";
import { drawerMenuItems } from "@/utils/static";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { FaXmark } from "react-icons/fa6";
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

  const drawerItems = drawerMenuItems();
  const allItems = Object.values(drawerItems).flat();
  const checkIfMenuItems = () =>
    Boolean(
      allItems.find(
        (e) =>
          e.key === routes?.[0] ||
          e?.menuItems?.map((r: any) => r.key).includes(routes?.[0]),
      )?.menuItems,
    );

  const [showItems, setShowItems] = useState(checkIfMenuItems);

  return (
    <>
      <div
        className={clsx(
          "md:py-6 py-4 px-0 space-y-4 w-full max-w-[270px] my-auto h-full flex flex-col",
          className,
        )}
      >
        <div className="flex justify-between items-center px-6">
          <Link href="/home" className="flex items-center gap-x-2">
            <Img
              height={32}
              width={160}
              alt=""
              src="/assets/icons/logo.png"
              className="max-h-8"
              isLocal
            />
          </Link>
          {Number(width) <= 1024 && (
            <FaXmark
              size={26}
              onClick={close}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
              stroke="black"
              className="cursor-pointer"
            />
          )}
        </div>
        <div className="space-y2 overflow-y-scroll">
          {Object.entries(drawerItems)?.map(([key, value]) => {
            return (
              <div key={key} className="space-y4">
                <Text
                  type="semibold"
                  size="sm"
                  variant="secondary"
                  className="py-4"
                >
                  {key}
                </Text>
                {value.map((item, idx) => {
                  let iconColor = "";
                  if (!item?.menuItems && pathname.includes(item.key)) {
                    iconColor = "var(--brand-600)";
                  } else if (item.disabled) {
                    iconColor = "#9CA3AF";
                  }
                  return (
                    <Fragment key={item.key}>
                      <Button
                        key={item?.title + idx}
                        btnName={item?.title}
                        variant={
                          !item?.menuItems && pathname.includes(item.key)
                            ? "secondary-color"
                            : "tertiary-link"
                        }
                        size="sm"
                        icon={item?.icon(iconColor)}
                        iconFirst
                        fullWidth
                        className={clsx(
                          "!justify-start !gap-x-3 !font-medium",
                          !item?.menuItems &&
                            pathname.includes(item.key) &&
                            "hover:!bg-white !border-gray-100",
                          item?.menuItems && "mb-0",
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
                                showItems && "rotate-180",
                              )}
                            />
                          )
                        }
                      />
                      {showItems && (
                        <div>
                          {item?.menuItems?.map((item1, idx1) => (
                            <Button
                              key={item1?.title + idx1}
                              btnName={item1.title}
                              variant={
                                pathname.includes(item1.key)
                                  ? "secondary"
                                  : "tertiary-link"
                              }
                              size="sm"
                              fullWidth
                              className={clsx(
                                "!justify-start animate-slide !pl-[50px] !font-medium",
                                pathname.includes(item1.key) &&
                                  "hover:!bg-white !border-gray-100",
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
            );
          })}
        </div>
      </div>
      <ConfirmationModal
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        onSubmit={() => {
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

"use client";
import Button from "@/shared/buttons/Button";
import InfoCluster from "@/shared/InfoCluster";
import MenuPopover, {
  type MenuPopoverItem,
} from "@/shared/popover/MenuPopover";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { FiBell, FiCheck, FiLogOut, FiSearch } from "react-icons/fi";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
import { extractText } from "@/utils/functions";
import { storageKeys } from "@/utils/enum";
import {
  clearLocalStorage,
  clearLocalStorageExcept,
  getLocalItem,
  setLocalItem,
} from "@/utils/localstorage";
import { IBreadCrumbs } from "@/utils/types";
import { RiHome6Line } from "react-icons/ri";
import { removeCookie } from "@/utils/cookies";
import ConfirmationModal from "@/shared/modal/ConfirmationModal";

const DEFAULT_USER = {
  name: "Suryansh Shokeen",
  initials: "SS",
};

/** UI-only labels for the role switcher (wire-up later). */
const SWITCH_ROLE_OPTIONS = [
  { id: "gs_admin", label: "GS Admin" },
  { id: "gs_relationship_manager", label: "GS Relationship Manager" },
  { id: "partner_admin", label: "Partner Admin" },
  { id: "partner_counsellor", label: "Partner Counsellor" },
] as const;

const Header = ({ breadCrumbs }: { breadCrumbs?: IBreadCrumbs[] }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [activeRoleId, setActiveRoleId] = useState<
    (typeof SWITCH_ROLE_OPTIONS)[number]["id"]
  >(
    getLocalItem(
      storageKeys.SELECTED_USER_ROLE,
    ) as (typeof SWITCH_ROLE_OPTIONS)[number]["id"],
  );
  const [userMenuStep, setUserMenuStep] = useState<"main" | "roles">("main");
  const data: IBreadCrumbs[] = breadCrumbs?.length
    ? breadCrumbs
    : [pathName?.split("/")?.[1]].map((e) => ({
        label: extractText(e),
      }));

  const handleLogout = () => {
    setIsLoading(true);
    clearLocalStorage();
    removeCookie(storageKeys.ACCESS_TOKEN);
    removeCookie(storageKeys.REFRESH_TOKEN);
    router.replace("/login");
  };

  const handleSelectRole = (
    roleId: (typeof SWITCH_ROLE_OPTIONS)[number]["id"],
  ) => {
    if (activeRoleId === roleId) return;
    setActiveRoleId(roleId);
    setLocalItem(storageKeys.SELECTED_USER_ROLE, roleId);
    clearLocalStorageExcept([storageKeys.SELECTED_USER_ROLE]);
    removeCookie(storageKeys.ACCESS_TOKEN);
    removeCookie(storageKeys.REFRESH_TOKEN);
    router.replace("/login");
  };

  const activeRoleLabel =
    SWITCH_ROLE_OPTIONS.find((r) => r.id === activeRoleId)?.label ?? "GS Admin";

  const userMenuItems: MenuPopoverItem[] =
    userMenuStep === "main"
      ? [
          {
            type: "item",
            id: "switch-role",
            label: "Switch role",
            onClick: () => setUserMenuStep("roles"),
            icon: <LuRefreshCw />,
            variant: "default",
            keepMenuOpen: true,
          },
          { type: "separator", id: "after-switch-role" },
          {
            type: "item",
            id: "logout",
            label: "Logout",
            onClick: () => setIsOpen(true),
            icon: <FiLogOut />,
            variant: "danger",
          },
        ]
      : [
          {
            type: "item",
            id: "back-roles",
            label: "Back",
            onClick: () => setUserMenuStep("main"),
            icon: <IoIosArrowBack className="text-gray-500" />,
            variant: "default",
            keepMenuOpen: true,
          },
          { type: "separator", id: "after-back" },
          ...SWITCH_ROLE_OPTIONS.map((role) => ({
            type: "item" as const,
            id: `role-${role.id}`,
            label: role.label,
            onClick: () => handleSelectRole(role.id),
            icon:
              activeRoleId === role.id ? (
                <FiCheck className="text-gray-900" aria-hidden />
              ) : (
                <span className="inline-block w-4 shrink-0" aria-hidden />
              ),
            variant: "default" as const,
          })),
          { type: "separator", id: "after-roles" },
          {
            type: "item",
            id: "logout",
            label: "Logout",
            onClick: () => setIsOpen(true),
            icon: <FiLogOut />,
            variant: "danger",
          },
        ];

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="lg:flex hidden items-center justify-between gap-4 pb-4 sticky top-0 w-full">
      <div className="flex items-center gap-x-2 min-w-0 flex-1">
        <RiHome6Line
          size={18}
          className="cursor-pointer text-gray-500 shrink-0"
          onClick={() => router.push("/")}
        />
        {data?.map((item, idx) => (
          <Fragment key={item?.label + idx}>
            <IoIosArrowForward className="text-gray-300 shrink-0" />
            <Button
              btnName={item?.label}
              size="sm"
              className={clsx(
                "capitalize !px-1 !py-0",
                data?.[data?.length - 1]?.label === item?.label
                  ? "text-gray-700"
                  : "!font-medium",
              )}
              variant="tertiary"
              onClick={
                item?.path ? () => router.push(item?.path ?? "") : () => {}
              }
            />
          </Fragment>
        ))}
      </div>

      <div className="flex items-center gap-x-4">
        <Button
          variant="secondary"
          className="!p-2"
          size="xs"
          icon={<FiSearch size={18} />}
        />

        <Button icon={<FiBell size={20} />} variant="tertiary-color-link">
          <span className="absolute bg-red-600 px-1 text-white rounded-full -top-[6px] -right-[6px] text-xs">
            4
          </span>
        </Button>

        <div className="h-8 w-px shrink-0 bg-gray-200" aria-hidden />

        <MenuPopover
          items={userMenuItems}
          menuItemsClassName="min-w-[min(100vw-2rem,18rem)] w-max max-w-[20rem]"
          onMenuButtonClick={() => setUserMenuStep("main")}
        >
          <InfoCluster
            titleProps={{
              children: DEFAULT_USER.name,
              size: "sm",
            }}
            descriptionProps={{
              children: activeRoleLabel,
              className: "text-left",
            }}
            textWrapperClass="!space-y-[2px]"
            initialsClassName="!text-sm"
            showInitials
            children={
              <IoIosArrowDown className="h-4 w-4 shrink-0 text-gray-400 order-last" />
            }
          />
        </MenuPopover>
      </div>
      <ConfirmationModal
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        onSubmit={handleLogout}
        styleHeader="flex gap-x-4 !space-y-0 items-center"
        rightBtnName="Yes, Logout"
        leftBtnName="Back"
        type="danger"
        isOpen={isOpen}
        size="md"
        isLoading={isLoading}
        close={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Header;

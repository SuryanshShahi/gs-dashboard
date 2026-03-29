import { FaArrowLeft, FaRegFolderOpen } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FiHeadphones } from "react-icons/fi";
import { LuClipboardList, LuLayoutGrid, LuSettings } from "react-icons/lu";
import { PiUsersBold } from "react-icons/pi";
import { RiFolderUserLine, RiShieldStarLine } from "react-icons/ri";
import React from "react";
import Img from "@/shared/Img";

export const authSliderData = [
  {
    image: "/assets/banner1.png",
    title: "Join 200+ Trusted  & Leading Global Partners",
    description:
      "Access exclusive opportunities and commission structures tailored to your agency's success.",
  },
  {
    image: "/assets/banner2.png",
    title: "Access a Wide Network of Top Universities",
    description:
      "Expand your portfolio with direct access to top universities in the UK, US, Canada, and more.",
  },
];
export const ErrorMessage = {
  REQUIRED: "This field is mandatory",
  INVALID_EMAIL: "Invalid email address",
  INVALID_PHONE: "Please enter a valid number",
  NO_SPECIAL_CHARACTERS: "Cannot have special characters",
  MAX_15_CHAR: "Please enter at most 15 characters",
  MIN_2_CHAR: "Please enter at least 2 characters",
};
export const Regex = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$|^$/,
  NAME: /^[a-zA-Z ]+$/,
  PHONE: /^[0-9]\d{9}$|^$/,
  AT_LEAST_EIGHT_CHAR: /^.{8,}$/,
  AT_LEAST_ONE_UPPER_CHAR: /.*[A-Z].*/,
  AT_LEAST_ONE_NUMBER: /^(?=.*\d)/,
  AT_LEAST_ONE_SPECIAL_CHAR: /^(?=.*[#?!@$%^&*-]).*$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};

export interface DrawerMenuItem {
  title: string;
  icon: (color?: string) => React.ReactElement;
  key: string;
  disabled: boolean;
  menuItems?: DrawerMenuItem[];
  allowedRoles?: string[];
}

export const drawerMenuItems = (
  userRole: string,
): Record<string, DrawerMenuItem[]> => {
  const iconColor = "var(--secondary)";
  return {
    "main-menu": [
      {
        title: "Overview",
        icon: (color?: string) => (
          <LuLayoutGrid height={24} width={24} color={color || iconColor} />
        ),
        key: "overview",
        disabled: false,
        allowedRoles: [
          "gs_admin",
          "gs_relationship_manager",
          "partner_admin",
          "partner_counsellor",
        ],
      },
      {
        title: "Partners",
        icon: (color?: string) => (
          <RiShieldStarLine height={24} width={24} color={color || iconColor} />
        ),
        key: "partners",
        disabled: false,
        allowedRoles: ["gs_admin", "gs_relationship_manager"],
      },
      {
        title: "Students",
        icon: (color?: string) => (
          <RiFolderUserLine height={24} width={24} color={color || iconColor} />
        ),
        key: "students",
        disabled: false,
        allowedRoles: [
          "gs_admin",
          "gs_relationship_manager",
          "partner_admin",
          "partner_counsellor",
        ],
      },
      {
        title: "Applications",
        icon: (color?: string) => (
          <LuClipboardList height={24} width={24} color={color || iconColor} />
        ),
        key: "applications",
        disabled: false,
        allowedRoles: [
          "gs_admin",
          "gs_relationship_manager",
          "partner_admin",
          "partner_counsellor",
        ],
      },
      {
        title: "Master Data",
        icon: (color?: string) => (
          <FaRegFolderOpen height={24} width={24} color={color || iconColor} />
        ),
        key: "master-data",
        disabled: false,
        allowedRoles: ["gs_admin"],
        menuItems: [
          {
            title: "Countries",
            icon: (color?: string) => (
              <FaCircleCheck
                height={24}
                width={24}
                color={color || iconColor}
              />
            ),
            key: "countries",
            disabled: false,
          },
          {
            title: "Universities",
            icon: (color?: string) => (
              <FaCircleCheck
                height={24}
                width={24}
                color={color || iconColor}
              />
            ),
            key: "universities",
            disabled: false,
          },
          {
            title: "Programs",
            icon: (color?: string) => (
              <FaCircleCheck
                height={24}
                width={24}
                color={color || iconColor}
              />
            ),
            key: "programs",
            disabled: false,
          },
        ],
      },
      {
        title: "Teams",
        icon: (color?: string) => (
          <PiUsersBold height={24} width={24} color={color || iconColor} />
        ),
        key: "teams",
        disabled: false,
        allowedRoles: ["gs_admin"],
      },
      {
        title: "Counsellors",
        icon: (color?: string) => (
          <PiUsersBold height={24} width={24} color={color || iconColor} />
        ),
        key: "counsellors",
        disabled: false,
        allowedRoles: ["partner_admin"],
      },
    ].filter((item) => item.allowedRoles?.includes(userRole)),
    support: [
      {
        title: "Help",
        icon: (color?: string) => (
          <FiHeadphones height={24} width={24} color={color || iconColor} />
        ),
        key: "help",
        disabled: false,
      },
      {
        title: "Settings",
        icon: (color?: string) => (
          <LuSettings height={24} width={24} color={color || iconColor} />
        ),
        key: "settings",
        disabled: false,
      },
    ],
  };
};

export const emptyState = {
  title: "No Data found",
  subtitle: "When you add data, it will appear here.",
  icon: (
    <Img
      height={118}
      width={152}
      alt=""
      isLocal
      src="/assets/icons/emptyState.png"
    />
  ),
  btnProps: {
    btnName: "Go Back",
    icon: <FaArrowLeft size={16} className="text-white" />,
  },
};

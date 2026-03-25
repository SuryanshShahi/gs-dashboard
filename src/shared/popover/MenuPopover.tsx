"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type MenuItemsAnchor = NonNullable<ComponentProps<typeof MenuItems>["anchor"]>;

export type MenuPopoverItem =
  | {
      type: "item";
      id: string;
      label: string;
      onClick: () => void;
      icon?: ReactNode;
      variant?: "default" | "danger";
    }
  | { type: "separator"; id: string };

export interface MenuPopoverProps {
  children: ReactNode;
  items: MenuPopoverItem[];
  menuButtonClassName?: string;
  menuItemsClassName?: string;
  anchor?: MenuItemsAnchor;
  className?: string;
}

const defaultButtonClasses =
  "flex w-full cursor-pointer rounded-lg outline-none transition-colors cursor-pointer";

const defaultPanelClasses =
  "z-50 mt-2 w-52 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0";

export default function MenuPopover({
  children,
  items,
  menuButtonClassName,
  menuItemsClassName,
  anchor = "bottom end",
  className,
}: MenuPopoverProps) {
  return (
    <Menu as="div" className={clsx("relative", className)}>
      <MenuButton className={clsx(defaultButtonClasses, menuButtonClassName)}>
        {children}
      </MenuButton>

      <MenuItems
        transition
        anchor={anchor}
        modal={false}
        className={clsx(defaultPanelClasses, menuItemsClassName)}
      >
        {items.map((entry) => {
          if (entry.type === "separator") {
            return (
              <MenuSeparator key={entry.id} className="h-px bg-gray-100" />
            );
          }

          const danger = entry.variant === "danger";

          return (
            <MenuItem key={entry.id}>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={entry.onClick}
                  className={clsx(
                    "flex w-full items-center gap-2 px-4 py-2 text-left text-sm cursor-pointer",
                    danger ? "text-red-600" : "text-gray-700",
                    focus && (danger ? "bg-red-50" : "bg-gray-50"),
                  )}
                >
                  {entry.icon != null && (
                    <span
                      className={clsx(
                        "shrink-0 [&_svg]:h-4 [&_svg]:w-4",
                        danger ? "text-red-600" : "text-gray-500",
                      )}
                    >
                      {entry.icon}
                    </span>
                  )}
                  {entry.label}
                </button>
              )}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}

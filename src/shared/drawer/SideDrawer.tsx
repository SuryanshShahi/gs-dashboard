"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export interface ISideDrawer {
  isOpen: boolean;
  close: () => void;
  className?: string;
  width?: string;
}

const SideDrawer: FC<PropsWithChildren<ISideDrawer>> = ({
  isOpen,
  close,
  children,
  className,
  width = "max-w-md",
}) => {
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in"
      />

      <DialogPanel
        transition
        className={clsx(
          "fixed inset-y-0 right-0 z-10 flex h-dvh max-h-[calc(100vh-32px)] w-full min-h-0 flex-col overflow-hidden bg-white shadow-xl rounded-2xl m-4",
          "transform transition-transform data-closed:translate-x-full data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in",
          width,
          className,
        )}
      >
        {children}
      </DialogPanel>
    </Dialog>
  );
};

export default SideDrawer;

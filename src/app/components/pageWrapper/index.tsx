"use client";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import useScrollHeight from "@/utils/hooks/useScrollHeight";
import { IBreadCrumbs } from "@/utils/types";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface IPageWraps {
  wrapperClass?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  breadCrumbs?: IBreadCrumbs[];
}

const PageWrapper: FC<PropsWithChildren<IPageWraps>> = ({
  children,
  wrapperClass,
  hideHeader,
  hideFooter,
  breadCrumbs,
}) => {
  const { ref } = useScrollHeight();

  return (
    <main className="flex flex-col h-full min-h-0">
      {!hideHeader && <Header breadCrumbs={breadCrumbs} />}
      <ToastContainer stacked />
      <div
        ref={ref}
        className={clsx(
          "animate-bottom overflow-hidden relative flex flex-col flex-1 min-h-0",
          wrapperClass,
        )}
      >
        {children}
      </div>
      {!hideFooter && <Footer />}
    </main>
  );
};

export default PageWrapper;

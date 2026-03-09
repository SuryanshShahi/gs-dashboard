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
    <main className="h-full">
      {!hideHeader && <Header breadCrumbs={breadCrumbs} />}
      <ToastContainer stacked />
      <div
        ref={ref}
        className={clsx(
          "animate-bottom overflow-scroll relative h-full",
          hideHeader
            ? "max-h-[calc(100vh-32px)]"
            : "lg:max-h-[calc(100vh-93px)] max-h-[calc(100vh-64px)]",
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

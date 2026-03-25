"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import useScrollHeight from "@/utils/hooks/useScrollHeight";
import { IBreadCrumbs } from "@/utils/types";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
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
      <div
        ref={ref}
        className={clsx(
          "animate-bottom overflow-hidden relative flex flex-col flex-1 min-h-0 max-h-[calc(100vh-117px)] overflow-y-auto",
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

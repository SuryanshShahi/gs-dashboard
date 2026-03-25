import PageWrapper from "@/components/pageWrapper";
import Universities from "@/features/masterData/universities";
import { Suspense } from "react";

const Page = () => {
  return (
    <PageWrapper
      breadCrumbs={[
        { label: "Main Menu", path: "/" },
        { label: "Master Data", path: "/countries" },
        { label: "Universities", path: "/universities" },
      ]}
    >
      <Suspense>
        <Universities />
      </Suspense>
    </PageWrapper>
  );
};

export default Page;

import PageWrapper from "@/components/pageWrapper";
import Countries from "@/features/masterData/countries";
import { Suspense } from "react";

const Page = () => {
  return (
    <PageWrapper
      breadCrumbs={[
        { label: "Main Menu", path: "/" },
        { label: "Master Data", path: "/countries" },
        { label: "Countries", path: "/countries" },
      ]}
    >
      <Suspense>
        <Countries />
      </Suspense>
    </PageWrapper>
  );
};

export default Page;

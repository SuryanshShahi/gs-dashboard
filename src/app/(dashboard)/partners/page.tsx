import PageWrapper from "@/components/pageWrapper";
import Partners from "@/features/partners";
import { Suspense } from "react";

const Page = () => {
  return (
    <PageWrapper
      breadCrumbs={[
        { label: "Main Menu", path: "/" },
        { label: "Partners", path: "/partners" },
      ]}
    >
      <Suspense>
        <Partners />
      </Suspense>
    </PageWrapper>
  );
};

export default Page;

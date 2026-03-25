import PageWrapper from "@/components/pageWrapper";
import Applications from "@/features/applications";
import { Suspense } from "react";

const Page = () => {
  return (
    <PageWrapper
      breadCrumbs={[
        { label: "Main Menu", path: "/" },
        { label: "Applications", path: "/applications" },
      ]}
    >
      <Suspense>
        <Applications />
      </Suspense>
    </PageWrapper>
  );
};

export default Page;

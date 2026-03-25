import PageWrapper from "@/components/pageWrapper";
import Programs from "@/features/masterData/programs";
import { Suspense } from "react";

const Page = () => {
  return (
    <PageWrapper
      breadCrumbs={[
        { label: "Main Menu", path: "/" },
        { label: "Master Data", path: "/countries" },
        { label: "Programs", path: "/programs" },
      ]}
    >
      <Suspense>
        <Programs />
      </Suspense>
    </PageWrapper>
  );
};

export default Page;

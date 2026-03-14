import PageWrapper from "@/components/pageWrapper";
import Partners from "@/features/partners";
import { Suspense } from "react";

const Page = () => {
  return (
    <PageWrapper>
      <Suspense>
        <Partners />
      </Suspense>
    </PageWrapper>
  );
};

export default Page;

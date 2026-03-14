import PageWrapper from "@/components/pageWrapper";
import Students from "@/features/students";
import { Suspense } from "react";

const Page = () => {
  return (
    <PageWrapper>
      <Suspense>
        <Students />
      </Suspense>
    </PageWrapper>
  );
};

export default Page;

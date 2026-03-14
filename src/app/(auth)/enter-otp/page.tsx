import PageWrapper from "@/components/pageWrapper";
import EnterOtp from "@/features/auth/enterOtp";

const Page = () => {
  return (
    <PageWrapper hideFooter hideHeader>
      <EnterOtp />
    </PageWrapper>
  );
};

export default Page;

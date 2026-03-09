import PageWrapper from "@/app/components/pageWrapper";
import EnterOtp from "@/app/features/auth/enterOtp";

const Page = () => {
  return (
    <PageWrapper hideFooter hideHeader>
      <EnterOtp />
    </PageWrapper>
  );
};

export default Page;

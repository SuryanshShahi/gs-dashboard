import PageWrapper from "@/components/pageWrapper";
import LoginViaEmail from "@/features/auth/loginViaEmail";

const Page = () => {
  return (
    <PageWrapper hideFooter hideHeader>
      <LoginViaEmail />
    </PageWrapper>
  );
};

export default Page;

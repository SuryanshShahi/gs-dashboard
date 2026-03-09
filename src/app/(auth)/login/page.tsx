import PageWrapper from "@/app/components/pageWrapper";
import LoginViaEmail from "@/app/features/auth/loginViaEmail";

const Page = () => {
  return (
    <PageWrapper hideFooter hideHeader>
      <LoginViaEmail />
    </PageWrapper>
  );
};

export default Page;

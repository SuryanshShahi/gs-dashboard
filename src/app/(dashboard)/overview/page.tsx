"use client";
import { refreshToken } from "@/apis/apis";
import PageWrapper from "@/components/pageWrapper";
import Overview from "@/features/overview";
import Button from "@/shared/buttons/Button";

const Page = () => {
  return (
    <PageWrapper>
      <Button btnName="refresh" onClick={() => refreshToken()} />
      <Overview />
    </PageWrapper>
  );
};

export default Page;

import PageHeader from "@/shared/heading/PageHeader";

const Help = () => {
  return (
    <div>
      <PageHeader
        titleProps={{
          children: "Help",
        }}
        descriptionProps={{
          children: "Get help with your account and billing.",
        }}
      />
    </div>
  );
};

export default Help;

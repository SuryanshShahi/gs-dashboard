import PageHeader from "@/shared/heading/PageHeader";

const Settings = () => {
  return (
    <div>
      <PageHeader
        titleProps={{
          children: "Settings",
        }}
        descriptionProps={{
          children: "Customize your account settings and preferences.",
        }}
      />
    </div>
  );
};

export default Settings;

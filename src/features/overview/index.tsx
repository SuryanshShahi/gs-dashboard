import PageHeader from "@/shared/heading/PageHeader";

const Overview = () => {
  return (
    <div>
      <PageHeader
        titleProps={{
          children: "Overview",
        }}
        descriptionProps={{
          children: "Track tasks efficiently and collaborate with your team.",
        }}
      />
    </div>
  );
};

export default Overview;

import Text from "./Text";

const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="space-y-1">
      <Text type="semibold" size="2xl">
        {title}
      </Text>
      <Text as="p" size="sm" variant="secondary">
        {description}
      </Text>
    </div>
  );
};

export default PageHeader;

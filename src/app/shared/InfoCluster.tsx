import Img from "./Img";

const InfoCluster = ({
  image,
  title,
  description,
}: {
  image?: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
        {image ? (
          <Img src={image} alt={title} width={36} height={36} />
        ) : (
          <span className="text-xs font-semibold text-gray-500">
            {title.charAt(0)}
          </span>
        )}
      </div>
      <div>
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  );
};

export default InfoCluster;

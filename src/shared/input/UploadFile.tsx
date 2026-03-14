import { FiUpload } from "react-icons/fi";
import InfoCluster from "../InfoCluster";

const UploadFile = ({
  label,
  required = false,
  subText,
}: {
  label: string;
  required?: boolean;
  subText?: string;
}) => {
  return (
    <div className="space-y-1">
      <div className="text-sm">
        {label}
        {required && <span className="text-red-500">&nbsp;*</span>}
      </div>
      <InfoCluster
        children={
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FiUpload className="w-5 h-5 text-primary" />
          </div>
        }
        titleProps={{
          children: "Click here to upload file",
          size: "xs",
        }}
        descriptionProps={{
          children: subText,
          size: "xxs",
        }}
        className="border border-gray-100 rounded-lg p-2 cursor-pointer"
      />
    </div>
  );
};

export default UploadFile;

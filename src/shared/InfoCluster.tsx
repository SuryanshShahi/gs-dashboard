import clsx from "clsx";
import Img from "./Img";
import Text, { TextProps } from "./heading/Text";
import { FC, PropsWithChildren } from "react";

const InfoCluster: FC<
  PropsWithChildren<{
    image?: string;
    titleProps: TextProps;
    descriptionProps?: TextProps;
    className?: string;
    showInitials?: boolean;
    textWrapperClass?: string;
  }>
> = ({
  image,
  titleProps,
  descriptionProps = {},
  className,
  showInitials = false,
  children,
  textWrapperClass,
}) => {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      {showInitials && (
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
          {image ? (
            <Img
              src={image}
              alt={titleProps.children as string}
              width={36}
              height={36}
            />
          ) : (
            <span className="text-xs font-semibold text-gray-500">
              {(titleProps?.children as string)?.charAt(0)}
            </span>
          )}
        </div>
      )}
      {children}
      <div className={clsx("space-y-1", textWrapperClass)}>
        <Text as="h2" type="medium" {...titleProps} />
        <Text as="p" size="xs" variant="text-gray-500" {...descriptionProps} />
      </div>
    </div>
  );
};

export default InfoCluster;

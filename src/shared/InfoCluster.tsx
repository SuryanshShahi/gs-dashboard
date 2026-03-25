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
    initialsClassName?: string;
    secondChild?: React.ReactNode;
  }>
> = ({
  image,
  titleProps,
  descriptionProps = {},
  className,
  showInitials = false,
  children,
  textWrapperClass,
  initialsClassName,
  secondChild,
}) => {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      {showInitials && (
        <div
          className={clsx(
            "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 text-xs",
            initialsClassName,
          )}
        >
          {image ? (
            <Img
              src={image}
              alt={titleProps.children as string}
              width={36}
              height={36}
            />
          ) : (
            <span className="font-semibold text-gray-500">
              {(titleProps?.children as string)?.charAt(0)}
            </span>
          )}
        </div>
      )}
      {children}
      <div className={clsx("space-y-1", textWrapperClass)}>
        <Text as="h2" type="medium" {...titleProps} />
        <Text as="p" size="xs" variant="tertiary" {...descriptionProps} />
        {secondChild}
      </div>
    </div>
  );
};

export default InfoCluster;

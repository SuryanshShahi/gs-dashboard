import clsx from "clsx";
import { FC, PropsWithChildren, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import { IButton } from "./buttons/Button";
import Img from "./Img";
import Loader from "./Loader";
import { emptyState } from "@/utils/static";
import Text from "./heading/Text";
export interface IEmptyState {
  title?: string;
  subtitle?: string;
  btnProps?: IButton | null;
  icon?: ReactNode;
}
interface IEmpty {
  data?: IEmptyState;
  size?: "sm" | "xs";
  className?: string;
  pageData?: any[] | null | string;
  height?: number;
  loaderClass?: string;
  hideBtn?: boolean;
  loaderVariant?: "full-screen";
}

const EmptyState: FC<PropsWithChildren<IEmpty>> = ({
  data,
  size = "sm",
  className,
  pageData = "children",
  children,
  height,
  loaderClass,
  hideBtn,
  loaderVariant,
}) => {
  const router = useRouter();
  const renderEmptyContent = () => {
    return (
      <div
        className={clsx(
          "h-screen relative flex flex-col justify-center items-center overflow-hidden",
          size === "sm" ? "space-y-6" : "space-y-8",
          className,
        )}
      >
        <Img
          src="/assets/icons/dots.png"
          height={480}
          width={480}
          alt="Empty State Icon"
          isLocal
          className="absolute -mt-36 object-cover"
        />
        <div
          className={clsx(
            "max-w-[370px] flex flex-col z-10 items-center mx-auto",
            size === "sm" ? "space-y-4" : "space-y-8",
          )}
        >
          {data?.icon || emptyState.icon}
          <div
            className={clsx(
              "text-center",
              size === "sm" ? "space-y-1" : "space-y-2",
            )}
          >
            <Text
              size={size === "sm" ? "lg" : "2xl"}
              type="semibold"
              className={clsx("w-max mx-auto")}
            >
              {data?.title || emptyState.title}
            </Text>
            <Text variant="tertiary" size={size}>
              {data?.subtitle || emptyState.subtitle}
            </Text>
          </div>
        </div>
        {!hideBtn && (
          <Button
            {...(data?.btnProps || emptyState.btnProps)}
            onClick={() => {
              if (data?.btnProps?.onClick) {
                data?.btnProps?.onClick();
              } else {
                router.back();
              }
            }}
            className="max-w-[370px] mx-auto z-10"
          />
        )}
      </div>
    );
  };

  const renderLoader = () => (
    <Loader
      height={height}
      wrapperClass={clsx(loaderClass)}
      variant={loaderVariant}
    />
  );

  return !pageData
    ? renderLoader()
    : pageData?.length === 0
      ? renderEmptyContent()
      : children;
};

export default EmptyState;

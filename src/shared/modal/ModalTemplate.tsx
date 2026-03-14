import Button from "@/shared/buttons/Button";
import clsx from "clsx";
import { FC, Fragment, PropsWithChildren, ReactNode } from "react";
import { tw } from "../../../tailwind.config";
import Divider from "../divider";
import InputField, { IInputField } from "../input/InputField";
import { IModal, Modal } from ".";
import { FaXmark } from "react-icons/fa6";

export interface IModalTemplate {
  className?: string;
  headerDetails?: {
    title: string;
    subtitle?: ReactNode;
    icon?: ReactNode;
  };
  inputProps?: IInputField;
  btnProps?: {
    leftBtnName?: string;
    rightBtnName?: string;
    btnWrapperClass?: string;
    isRightBtnLoading?: boolean;
    isLeftBtnLoading?: boolean;
    leftOnClick?: () => void;
    rightOnClick?: () => void;
    disabled?: boolean;
  } | null;
  modalProps: IModal;
}

export const ModalTemplate: FC<PropsWithChildren<IModalTemplate>> = ({
  children,
  className,
  headerDetails,
  inputProps,
  btnProps,
  modalProps,
}) => {
  return (
    <Modal {...modalProps}>
      {headerDetails && (
        <Fragment>
          {/* <UserCard
            title={headerDetails?.title}
            subtitle={headerDetails?.subtitle}
            styleTitle="text-lg"
            styleSubtitle="!text-tertiary"
            className={clsx(
              "gap-x-4 p-6",
              headerDetails?.subtitle && "!items-start",
            )}
            image={
              <IconWithBg
                icon={headerDetails?.icon || <SvgFlag stroke="white" />}
              />
            }
          > */}
          <FaXmark
            height={24}
            width={24}
            stroke={tw.textColor["tertiary"]}
            className="ml-auto cursor-pointer"
            onClick={modalProps.close}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
          />
          {/* </UserCard> */}
          <Divider variant="secondary" />
        </Fragment>
      )}
      {inputProps?.name && (
        <div className="px-6 pt-6 pb-5">
          <InputField name={inputProps?.name} {...inputProps} />
        </div>
      )}
      <div className={clsx("overflow-y-scroll", className)}>{children}</div>
      {btnProps && (
        <div
          className={clsx(
            "flex p-6 shadow-top w-full gap-x-3 mt-auto",
            btnProps.btnWrapperClass,
          )}
        >
          {btnProps?.leftBtnName && (
            <Button
              btnName={btnProps?.leftBtnName}
              variant="secondary"
              fullWidth
              onClick={btnProps?.leftOnClick || modalProps?.close}
              isLoading={btnProps?.isLeftBtnLoading}
            />
          )}
          {btnProps?.rightBtnName && (
            <Button
              btnName={btnProps?.rightBtnName}
              fullWidth
              onClick={btnProps?.rightOnClick}
              disabled={btnProps?.disabled}
              isLoading={btnProps?.isRightBtnLoading}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

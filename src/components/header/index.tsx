"use client";
import Button from "@/shared/buttons/Button";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { extractText } from "@/utils/functions";
import { IBreadCrumbs } from "@/utils/types";
import { tw } from "../../../tailwind.config";
import { MdHome } from "react-icons/md";
import { RiHome6Line } from "react-icons/ri";

const Header = ({ breadCrumbs }: { breadCrumbs?: IBreadCrumbs[] }) => {
  const router = useRouter();
  const pathName = usePathname();
  const data: IBreadCrumbs[] = breadCrumbs?.length
    ? breadCrumbs
    : [pathName?.split("/")?.[1]].map((e) => ({
        label: extractText(e),
      }));
  return (
    <div className="lg:flex hidden items-center gap-x-2 pb-4 sticky top-0">
      <RiHome6Line
        size={18}
        className="cursor-pointer text-gray-500"
        onClick={() => router.push("/")}
      />
      {data?.map((item, idx) => (
        <Fragment key={item?.label + idx}>
          <IoIosArrowForward className="text-gray-300" />
          <Button
            btnName={item?.label}
            size="sm"
            className={clsx(
              "capitalize !px-1 !py-0",
              data?.[data?.length - 1]?.label === item?.label
                ? "text-gray-700"
                : "!font-medium",
            )}
            variant="tertiary"
            onClick={
              item?.path ? () => router.push(item?.path ?? "") : () => {}
            }
          />
        </Fragment>
      ))}
    </div>
  );
};

export default Header;

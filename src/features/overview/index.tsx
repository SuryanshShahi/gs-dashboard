"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Chip from "@/shared/Chip";
import DataTable from "@/shared/table/DataTable";
import Text from "@/shared/heading/Text";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiClock,
  FiCloud,
  FiFileText,
  FiPlus,
  FiUserPlus,
} from "react-icons/fi";
import {
  LuAward,
  LuBuilding2,
  LuFileText,
  LuGraduationCap,
} from "react-icons/lu";
import clsx from "clsx";
import {
  overviewMetrics,
  pendingGsReviewCount,
  recentApplicationsMock,
  topPartnersMock,
} from "./mockData";
import { recentApplicationsColumns } from "./recentApplicationsColumns";
import useHook from "./useHook";
import InfoCluster from "@/shared/InfoCluster";

const iconToneClasses = {
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-purple-50 text-purple-600",
  teal: "bg-teal-50 text-teal-600",
  green: "bg-green-50 text-green-600",
};

function MetricIcon({
  tone,
  id,
}: {
  tone: keyof typeof iconToneClasses;
  id: string;
}) {
  const wrap = clsx(
    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
    iconToneClasses[tone],
  );
  switch (id) {
    case "applications":
      return (
        <div className={wrap}>
          <LuFileText className="w-5 h-5" />
        </div>
      );
    case "partners":
      return (
        <div className={wrap}>
          <LuBuilding2 className="w-5 h-5" />
        </div>
      );
    case "students":
      return (
        <div className={wrap}>
          <LuGraduationCap className="w-5 h-5" />
        </div>
      );
    case "enrolled":
      return (
        <div className={wrap}>
          <LuAward className="w-5 h-5" />
        </div>
      );
    default:
      return (
        <div className={wrap}>
          <FiFileText className="w-5 h-5" />
        </div>
      );
  }
}

const Overview = () => {
  const { greeting, dateLabel } = useHook();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <Text as="h1" size="2xl" type="semibold" variant="black">
            {greeting}{" "}
            <span className="inline-block" aria-hidden>
              👋
            </span>
          </Text>
          <Text as="p" size="sm" type="medium" variant="tertiary">
            {dateLabel}
          </Text>
        </div>
        <Chip title="GS Admin" variant="blue" size="xs" type="tag" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {overviewMetrics.map((m) => (
          <CardWrapper key={m.id} className="flex gap-4 items-start">
            <MetricIcon tone={m.iconTone} id={m.id} />
            <div className="min-w-0 flex-1 space-y-1">
              <Text as="p" size="2xl" type="semibold" variant="black">
                {m.value}
              </Text>
              <Text as="p" size="sm" type="medium" variant="black">
                {m.label}
              </Text>
              <Text as="p" size="xs" variant="secondary">
                {m.sublabel}
              </Text>
              {m.trend ? (
                <p
                  className={clsx(
                    "text-xs font-medium",
                    m.trendPositive ? "text-green-600" : "text-red-600",
                  )}
                >
                  {m.trend}
                </p>
              ) : null}
            </div>
          </CardWrapper>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <div className="flex items-start gap-2">
          <FiClock
            className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
            aria-hidden
          />
          <p>
            <span className="font-semibold">
              {pendingGsReviewCount} applications
            </span>{" "}
            are awaiting GS review action.
          </p>
        </div>
        <Link
          href="/applications"
          className="text-sm font-semibold text-amber-600 hover:text-amber-700 whitespace-nowrap inline-flex items-center gap-1 shrink-0"
        >
          Review now
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardWrapper className="space-y-4">
          <Text as="h3" type="semibold" size="base" className="text-gray-900">
            Quick Actions
          </Text>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                btnName: "Add Partner",
                icon: <FiPlus className="w-4 h-4" />,
                onClick: () => router.push("/onboarding/partner/overview"),
              },
              {
                btnName: "Add Team Member",
                icon: <FiUserPlus className="w-4 h-4" />,
                onClick: () => router.push("/onboarding/team/personal-details"),
              },
              {
                btnName: "Bulk Import",
                icon: <FiCloud className="w-4 h-4" />,
                onClick: () => router.push("/partners"),
              },
              {
                btnName: "View Applications",
                icon: <FiFileText className="w-4 h-4" />,
                onClick: () => router.push("/applications"),
              },
            ].map((item) => (
              <Button
                key={item.btnName}
                type="button"
                variant="secondary"
                size="xs"
                fullWidth
                className="!border-gray-200 !gap-x-2"
                {...item}
              />
            ))}
          </div>
        </CardWrapper>

        <CardWrapper className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Text as="h3" type="semibold" size="base" className="text-gray-900">
              Top Partners
            </Text>
            <Link
              href="/partners"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {topPartnersMock.map((p) => (
              <li key={p.rank} className="flex items-center gap-3 text-sm">
                <Text as="p" size="xs" type="medium" variant="tertiary">
                  {p.rank}
                </Text>
                <InfoCluster
                  titleProps={{ children: p.name, size: "sm" }}
                  descriptionProps={{ children: p.location }}
                  textWrapperClass="!space-y-0"
                  showInitials
                  initialsClassName={clsx(p.avatarClass, "!h-9 !w-9")}
                />

                <div className="ml-auto">
                  <Text as="p" size="sm" type="semibold" variant="black">
                    {p.apps}
                  </Text>
                  <Text as="p" size="xs" variant="tertiary">
                    apps
                  </Text>
                </div>
              </li>
            ))}
          </ul>
        </CardWrapper>
      </div>

      <CardWrapper className="!p-0 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <Text as="h3" type="semibold" size="base" className="text-gray-900">
            Recent Applications
          </Text>
          <Button
            type="button"
            btnName="View all"
            variant="tertiary-color-link"
            size="xs"
            secondaryIcon={<FiArrowRight className="w-4 h-4" />}
            onClick={() => router.push("/applications")}
          />
        </div>
        <DataTable
          columns={recentApplicationsColumns}
          data={recentApplicationsMock}
          hidePagination
          className="[&>div:first-child]:border-0 [&>div:first-child]:rounded-none"
        />
      </CardWrapper>
    </div>
  );
};

export default Overview;

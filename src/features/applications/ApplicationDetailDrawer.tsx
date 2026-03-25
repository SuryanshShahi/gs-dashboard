"use client";
import Chip from "@/shared/Chip";
import SideDrawer from "@/shared/drawer/SideDrawer";
import Text from "@/shared/heading/Text";
import { FC } from "react";
import { FiMail, FiMaximize2, FiMoreVertical } from "react-icons/fi";
import { LuCalendar, LuGraduationCap, LuHash, LuSchool } from "react-icons/lu";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import type { ApplicationRecord, ApplicationStage } from "./types";

interface Props {
  application: ApplicationRecord | null;
  isOpen: boolean;
  close: () => void;
}

function formatSubmitted(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function stageChipVariant(
  stage: ApplicationStage,
):
  | "success"
  | "orange"
  | "blue"
  | "purple"
  | "warning"
  | "gray"
  | "error" {
  switch (stage) {
    case "Enrolled":
    case "Offer Received":
      return "success";
    case "Sent To University":
      return "orange";
    case "GS Approved":
    case "Pending GS":
      return "blue";
    case "RM Review":
      return "purple";
    case "Partner Review":
      return "warning";
    case "Draft":
      return "gray";
    case "Rejected":
      return "error";
    default:
      return "gray";
  }
}

const InfoField: FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="space-y-1">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm text-gray-900">{value || "—"}</p>
  </div>
);

const ApplicationDetailDrawer: FC<Props> = ({
  application,
  isOpen,
  close,
}) => {
  if (!application) return null;

  return (
    <SideDrawer isOpen={isOpen} close={close} width="max-w-[480px]">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-500">
            <MdKeyboardDoubleArrowRight className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">
              Application Details
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-1.5 hover:bg-gray-100 rounded-md"
              aria-label="Expand"
            >
              <FiMaximize2 className="w-4 h-4 text-gray-500" />
            </button>
            <button
              type="button"
              className="p-1.5 hover:bg-gray-100 rounded-md"
              aria-label="More options"
            >
              <FiMoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div>
            <Text
              as="h2"
              type="semibold"
              className="text-lg text-gray-900"
              children={application.id}
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Chip
                title={application.stage}
                variant={stageChipVariant(application.stage)}
                size="sm"
                className="rounded-lg! normal-case!"
              />
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <LuCalendar className="w-3.5 h-3.5" />
                Submitted {formatSubmitted(application.submittedAt)}
              </span>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-3">
            <Text
              as="h3"
              type="semibold"
              size="sm"
              className="text-gray-900"
              children="Student"
            />
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-gray-500">
                  {application.studentName.charAt(0)}
                </span>
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {application.studentName}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <FiMail className="w-3.5 h-3.5 shrink-0" />
                  {application.studentEmail}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <Text
              as="h3"
              type="semibold"
              size="sm"
              className="text-gray-900"
              children="Partner & counsellor"
            />
            <InfoField
              label="Partner"
              value={application.partnerName}
            />
            <InfoField
              label="Counsellor"
              value={application.counsellorName}
            />
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <Text
              as="h3"
              type="semibold"
              size="sm"
              className="text-gray-900 flex items-center gap-2"
            >
              <LuSchool className="w-4 h-4 text-gray-400" />
              University & program
            </Text>
            <InfoField label="University" value={application.university} />
            <InfoField label="Program" value={application.program} />
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <LuGraduationCap className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">Intake</span>
              <span>{application.intake}</span>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <LuHash className="w-4 h-4 text-gray-400" />
            <span>Application reference</span>
            <span className="font-medium text-gray-900">{application.id}</span>
          </div>
        </div>
      </div>
    </SideDrawer>
  );
};

export default ApplicationDetailDrawer;

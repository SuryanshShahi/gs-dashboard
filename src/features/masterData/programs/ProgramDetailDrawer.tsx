"use client";

import Chip from "@/shared/Chip";
import SideDrawer from "@/shared/drawer/SideDrawer";
import Text from "@/shared/heading/Text";
import type { FC } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { categoryLabel } from "./columns";
import type { ProgramTableRow } from "./types";

interface Props {
  program: ProgramTableRow | null;
  isOpen: boolean;
  close: () => void;
}

const ProgramDetailDrawer: FC<Props> = ({ program, isOpen, close }) => {
  if (!program) return null;

  return (
    <SideDrawer isOpen={isOpen} close={close} width="max-w-[480px]">
      <div className="flex flex-col h-full min-h-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2 text-gray-500">
            <MdKeyboardDoubleArrowRight className="w-5 h-5" />
            <Text as="span" size="sm" variant="secondary">
              Program details
            </Text>
          </div>
          <button
            type="button"
            onClick={close}
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div>
            <Text as="h3" size="lg" type="semibold" variant="primary">
              {program.name}
            </Text>
            <div className="mt-2">
              <Chip
                title={categoryLabel(program.category)}
                variant={
                  program.category === "UNDERGRADUATE"
                    ? "blue"
                    : program.category === "POSTGRADUATE"
                      ? "purple"
                      : program.category === "PHD"
                        ? "orange"
                        : "pink"
                }
                size="sm"
                className="rounded-full! normal-case!"
              />
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-gray-500">University</p>
              <p className="text-gray-900 font-medium">
                {program.universityName}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                {program.flagEmoji} {program.countryName}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-gray-900">{program.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Study mode</p>
                <p className="text-gray-900">{program.studyMode}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tuition (per year)</p>
              <p className="text-gray-900 font-medium">
                {program.tuitionPerYear}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Intakes</p>
              <div className="flex flex-wrap gap-2">
                {program.intakes.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <Chip
                title={program.status === "ACTIVE" ? "Active" : "Inactive"}
                variant={program.status === "ACTIVE" ? "success" : "gray"}
                size="sm"
                type="tag"
              />
            </div>
          </div>
        </div>
      </div>
    </SideDrawer>
  );
};

export default ProgramDetailDrawer;

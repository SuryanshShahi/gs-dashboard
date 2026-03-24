"use client";
import Button from "@/shared/buttons/Button";
import Chip from "@/shared/Chip";
import Divider from "@/shared/divider";
import SideDrawer from "@/shared/drawer/SideDrawer";
import Text from "@/shared/heading/Text";
import InfoCluster from "@/shared/InfoCluster";
import { FC } from "react";
import { FiMail, FiMaximize2, FiMoreVertical, FiUser } from "react-icons/fi";
import { LuHash, LuShieldCheck } from "react-icons/lu";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import type { IStudent } from "./types";

interface Props {
  student: IStudent | null;
  isOpen: boolean;
  close: () => void;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function computeAge(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function formatAddress(a: IStudent["address"]): string {
  if (!a) return "—";
  return [a.line1, a.line2, a.city, a.state, a.country, a.postalCode]
    .filter(Boolean)
    .join(", ");
}

function formatGender(g: string): string {
  if (!g) return "—";
  return g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
}

const Section: FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
    {children}
  </div>
);

const InfoField: FC<{
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}> = ({ icon, label, value }) => (
  <div className="">
    <p className="text-xs text-gray-500 flex items-center gap-1.5">
      {icon}
      {label}
    </p>
    <p className="text-sm text-gray-900">{value || "—"}</p>
  </div>
);

const StudentDetailDrawer: FC<Props> = ({ student, isOpen, close }) => {
  if (!student) return null;

  const fullName = `${student.firstName} ${student.lastName}`.trim();
  const creatorName = student.creator
    ? `${student.creator.firstName} ${student.creator.lastName}`.trim()
    : "—";
  const counsellorName = student.counsellor
    ? `${student.counsellor.firstName} ${student.counsellor.lastName}`.trim()
    : null;
  const counsellorAffiliation = student.partner?.companyName ?? "";
  const age = computeAge(student.dateOfBirth);
  const statusVariant =
    student.status === "ACTIVE"
      ? "success"
      : student.status === "INACTIVE"
        ? "gray"
        : "warning";

  return (
    <SideDrawer isOpen={isOpen} close={close} width="max-w-[480px]">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <MdKeyboardDoubleArrowRight
              className="w-5 h-5 cursor-pointer"
              onClick={close}
            />
            <Text size="sm">Member Details</Text>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="tertiary"
              size="xs"
              icon={<FiMaximize2 className="w-4 h-4 text-gray-500" />}
            />
            <Button
              variant="tertiary"
              size="xs"
              icon={<FiMoreVertical className="w-4 h-4 text-gray-500" />}
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          <div className="space-y-4">
            <Text as="h2" type="bold" size="xl">
              {fullName}
            </Text>

            <div className="space-y-4">
              {[
                {
                  icon: <LuHash className="w-4 h-4 text-gray-400 shrink-0" />,
                  label: "Student ID",
                  value: student.id,
                },
                {
                  icon: <FiMail className="w-4 h-4 text-gray-400 shrink-0" />,
                  label: "Email",
                  value: student.personalEmail,
                },
                {
                  icon: <FiUser className="w-4 h-4 text-gray-400 shrink-0" />,
                  label: "Added By",
                  value: creatorName,
                },
                {
                  icon: (
                    <LuShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
                  ),
                  label: "Status",
                  children: (
                    <Chip
                      title={formatGender(student.status)}
                      variant={statusVariant}
                      type="tag"
                      size="xs"
                    />
                  ),
                },
              ].map((item) => (
                <div
                  className="flex items-center gap-3 text-sm"
                  key={item.label}
                >
                  {item.icon}
                  <span className="text-gray-500 w-24 shrink-0">
                    {item.label}
                  </span>
                  {item.children ?? (
                    <span className="text-gray-900">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Divider className="!border-gray-200" />

          <div className="space-y-2">
            <Text as="h3" type="semibold">
              Personal Information
            </Text>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoField label="Phone Number" value={student.phone || "—"} />
                <InfoField
                  label="Gender"
                  value={formatGender(student.gender)}
                />
              </div>
              <InfoField
                label="Date of Birth"
                value={
                  student.dateOfBirth
                    ? `${formatDate(student.dateOfBirth)}${age !== null ? ` (Age: ${age})` : ""}`
                    : "—"
                }
              />
              <InfoField
                label="Complete Address"
                value={formatAddress(student.address)}
              />
            </div>
          </div>

          <Divider className="!border-gray-200" />

          <div className="space-y-2">
            <Text as="h3" type="semibold">
              Citizenship Details
            </Text>
            <div className="grid grid-cols-2 gap-4">
              <InfoField
                label="Country of Citizenship"
                value={student.nationality || "—"}
              />
              <InfoField
                label="Passport"
                value={student.passportNumber || "—"}
              />
            </div>
          </div>

          <Divider className="!border-gray-200" />

          <div className="space-y-2">
            <Text as="h3" type="semibold">
              Counsellor Details
            </Text>
            <div className="space-y-1">
              <Text as="p" size="sm" variant="text-gray-500">
                Counsellor Name
              </Text>
              <InfoCluster
                titleProps={{
                  className: "text-sm text-gray-900",
                  children: counsellorName,
                }}
                descriptionProps={{
                  className: "text-xs text-gray-500",
                  children: counsellorAffiliation,
                }}
                showInitials
              />
            </div>
          </div>
        </div>
      </div>
    </SideDrawer>
  );
};

export default StudentDetailDrawer;

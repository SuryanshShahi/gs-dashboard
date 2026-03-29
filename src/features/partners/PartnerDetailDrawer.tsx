"use client";

import Chip from "@/shared/Chip";
import Divider from "@/shared/divider";
import SideDrawer from "@/shared/drawer/SideDrawer";
import Text from "@/shared/heading/Text";
import InfoCluster from "@/shared/InfoCluster";
import { convertDate } from "@/utils/functions";
import type { FC, ReactNode } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { LuBuilding2, LuMapPin, LuUsers } from "react-icons/lu";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import type { IPartner } from "./types";

interface Props {
  partner: IPartner | null;
  isOpen: boolean;
  close: () => void;
}

function humanizeSlug(value: string): string {
  if (!value) return "";
  return value
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function formatAddress(p: IPartner): string {
  const a = p.address;
  if (!a) return "—";
  return [a.line1, a.line2, a.city, a.state, a.country, a.postalCode]
    .filter(Boolean)
    .map((x) => (typeof x === "string" ? humanizeSlug(x) : x))
    .join(", ");
}

const InfoField: FC<{ label: string; value: ReactNode }> = ({
  label,
  value,
}) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm text-gray-900">{value ?? "—"}</p>
  </div>
);

const PartnerDetailDrawer: FC<Props> = ({ partner, isOpen, close }) => {
  if (!partner) return null;

  const rm = partner.assignedRm;
  const rmName = rm ? `${rm.firstName} ${rm.lastName}`.trim() : null;

  return (
    <SideDrawer isOpen={isOpen} close={close} width="max-w-[480px]">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2 text-gray-500">
            <MdKeyboardDoubleArrowRight
              className="h-5 w-5 cursor-pointer"
              onClick={close}
              aria-hidden
            />
            <Text size="sm" variant="secondary">
              Partner details
            </Text>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5 pb-8">
          <InfoCluster
            titleProps={{
              children: partner.companyName,
              size: "lg",
              type: "semibold",
            }}
            initialsClassName="!h-[54px] !w-[54px] !rounded-md"
            descriptionProps={{
              as: "div",
              children: (
                <div className="flex items-center gap-2">
                  <Chip
                    title={partner.partnerCode || partner.id}
                    variant="gray"
                    size="xs"
                  />
                  <Chip
                    title={partner.isActive ? "Active" : "Inactive"}
                    variant={partner.isActive ? "success" : "gray"}
                    size="xs"
                    type="tag"
                  />
                </div>
              ),
              size: "sm",
            }}
            showInitials
          />

          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm">
              <FiMail className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Company email</p>
                <p className="text-gray-900">{partner.companyEmail || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <FiPhone className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-gray-900">{partner.phone || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <LuMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-gray-900">{formatAddress(partner)}</p>
              </div>
            </div>
          </div>

          <Divider className="!border-gray-200" />

          <div className="space-y-3">
            <Text as="h3" type="semibold" size="sm">
              Registration & tax
            </Text>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoField
                label="Registration number"
                value={partner.registrationNumber || "—"}
              />
              <InfoField label="GST" value={partner.gstNumber || "—"} />
              <InfoField label="PAN" value={partner.panNumber || "—"} />
            </div>
          </div>

          <Divider className="!border-gray-200" />

          <div className="space-y-3">
            <Text as="h3" type="semibold" size="sm">
              Relationship manager
            </Text>
            {rmName ? (
              <InfoCluster
                titleProps={{ children: rmName, className: "text-sm" }}
                descriptionProps={{
                  children: rm?.email || "—",
                  size: "xs",
                  variant: "tertiary",
                }}
                showInitials
                textWrapperClass="!space-y-0"
              />
            ) : (
              <p className="text-sm text-amber-600">Unassigned</p>
            )}
          </div>

          <Divider className="!border-gray-200" />

          <div className="space-y-3">
            <Text as="h3" type="semibold" size="sm">
              Activity
            </Text>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                <LuUsers className="h-4 w-4 text-brand-600" />
                <div>
                  <p className="text-xs text-gray-500">Students</p>
                  <p className="text-sm font-medium text-gray-900">
                    {partner._count?.students ?? 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                <LuBuilding2 className="h-4 w-4 text-brand-600" />
                <div>
                  <p className="text-xs text-gray-500">Users</p>
                  <p className="text-sm font-medium text-gray-900">
                    {partner._count?.users ?? 0}
                  </p>
                </div>
              </div>
            </div>
            <InfoField
              label="Onboarded"
              value={convertDate(partner.createdAt)}
            />
          </div>
        </div>
      </div>
    </SideDrawer>
  );
};

export default PartnerDetailDrawer;

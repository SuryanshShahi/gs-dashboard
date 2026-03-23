import { getPartners } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { Partner } from "./mockData";
import type { IPartner } from "./types";

function humanizeSlug(value: string): string {
    if (!value) return "";
    return value
        .split("_")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
}

function formatLocation(partner: IPartner): string {
    const { city, state, country } = partner.address ?? {
        city: "",
        state: "",
        country: "",
    };
    const parts = [city, state, country].filter(Boolean).map(humanizeSlug);
    return parts.length > 0 ? parts.join(", ") : "—";
}

/** Maps API partner → table/card `Partner` shape (same as former mock rows). */
function mapIPartnerToPartnerRow(partner: IPartner): Partner {
    const students = partner._count?.students ?? 0;
    const rm = partner.assignedRm;

    return {
        id: partner.partnerCode || partner.id,
        name: partner.companyName,
        logo: partner.logoUrl || "",
        location: formatLocation(partner),
        activeStudents: students,
        applications: students,
        pendingApplications: null,
        relationshipManager: rm
            ? {
                  name: `${rm.firstName} ${rm.lastName}`.trim(),
                  avatar: "",
              }
            : null,
    };
}

const useHook = () => {
    const { data, isLoading, error, isError } = useQuery<IPartner[]>({
        queryKey: ["partners"],
        queryFn: () => getPartners(),
    });

    const tableRows: Partner[] = useMemo(
        () => (data ?? []).map(mapIPartnerToPartnerRow),
        [data],
    );

    return {
        partners: data,
        tableRows,
        isLoading,
        error,
        isError,
    };
};

export default useHook;

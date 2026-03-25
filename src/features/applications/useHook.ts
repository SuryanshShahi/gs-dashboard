import { useMemo } from "react";
import { applicationsMockData } from "./mockData";
import type { ApplicationRecord, ApplicationTabFilter } from "./types";
import {
  APPROVED_STAGES,
  UNDER_REVIEW_STAGES,
} from "./types";

export function applicationMatchesTab(
  row: ApplicationRecord,
  tab: ApplicationTabFilter,
): boolean {
  if (tab === "all") return true;
  if (tab === "draft") return row.stage === "Draft";
  if (tab === "under-review") return UNDER_REVIEW_STAGES.includes(row.stage);
  if (tab === "approved") return APPROVED_STAGES.includes(row.stage);
  if (tab === "enrolled") return row.stage === "Enrolled";
  if (tab === "rejected") return row.stage === "Rejected";
  return true;
}

export interface ApplicationStats {
  total: number;
  pendingReview: number;
  gsApproved: number;
  enrolled: number;
}

function computeStats(rows: ApplicationRecord[]): ApplicationStats {
  return {
    total: rows.length,
    pendingReview: rows.filter((r) =>
      UNDER_REVIEW_STAGES.includes(r.stage),
    ).length,
    gsApproved: rows.filter((r) => r.stage === "GS Approved").length,
    enrolled: rows.filter((r) => r.stage === "Enrolled").length,
  };
}

const useHook = () => {
  const applications = applicationsMockData;

  const stats: ApplicationStats = useMemo(
    () => computeStats(applications),
    [applications],
  );

  return {
    applications,
    stats,
    isLoading: false,
    isError: false,
    error: null as Error | null,
  };
};

export default useHook;

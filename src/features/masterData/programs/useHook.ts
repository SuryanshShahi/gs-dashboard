import { getPrograms } from "@/apis/apis";
import { combine } from "@/utils/functions";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { IProgram, ProgramTableRow } from "./types";

function computeStats(rows: ProgramTableRow[]) {
  const total = rows.length;
  const active = rows.filter((r) => r.status === "ACTIVE").length;
  const universitiesCovered = new Set(rows.map((r) => r.universityName)).size;
  const countries = new Set(rows.map((r) => r.countryName)).size;
  return { total, active, universitiesCovered, countries };
}

const useHook = () => {
  const { data: programs, isLoading, isError, error } = useQuery<IProgram[]>({
    queryKey: ["programs"],
    queryFn: getPrograms,
  });

  const tableRows = useMemo<ProgramTableRow[]>(() => {
    if (!programs?.length) return [];

    return programs.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.level,
      universityName: p.university?.name ?? "",
      countryName: p.university?.country ?? "",
      flagEmoji: "🌍",
      duration: "1 year",
      studyMode: "Full-Time",
      intakes: ["Sep 2025"],
      tuitionPerYear: combine(p.currency, p.tuitionFee),
      status: p.isActive ? "ACTIVE" : "INACTIVE",
    }));
  }, [programs]);

  const stats = useMemo(() => computeStats(tableRows), [tableRows]);

  return {
    tableRows,
    stats,
    isLoading,
    isError,
    error: error as Error | null,
  };
};

export default useHook;

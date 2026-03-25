import { useMemo } from "react";
import { universitiesMockData } from "./mockData";
import type { UniversityTableRow } from "./types";

function computeStats(rows: UniversityTableRow[]) {
  const total = rows.length;
  const active = rows.filter((r) => r.status === "ACTIVE").length;
  const countriesCovered = new Set(rows.map((r) => r.countryName)).size;
  const totalPrograms = rows.reduce((acc, r) => acc + r.programs, 0);
  return { total, active, countriesCovered, totalPrograms };
}

const useHook = () => {
  const rows = universitiesMockData;

  const stats = useMemo(() => computeStats(rows), [rows]);

  return {
    tableRows: rows,
    stats,
    isLoading: false,
    isError: false,
    error: null as Error | null,
  };
};

export default useHook;

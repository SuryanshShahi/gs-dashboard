import { useMemo } from "react";
import { programsMockData } from "./mockData";
import type { ProgramTableRow } from "./types";

function computeStats(rows: ProgramTableRow[]) {
  const total = rows.length;
  const active = rows.filter((r) => r.status === "ACTIVE").length;
  const universitiesCovered = new Set(rows.map((r) => r.universityName)).size;
  const countries = new Set(rows.map((r) => r.countryName)).size;
  return { total, active, universitiesCovered, countries };
}

const useHook = () => {
  const rows = programsMockData;

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

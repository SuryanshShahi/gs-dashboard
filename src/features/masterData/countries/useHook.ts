import { useMemo } from "react";
import { countriesMockData } from "./mockData";
import type { CountryTableRow } from "./types";

function computeStats(rows: CountryTableRow[]) {
  const total = rows.length;
  const active = rows.filter((r) => r.status === "ACTIVE").length;
  const inactive = rows.filter((r) => r.status === "INACTIVE").length;
  return { total, active, inactive };
}

const useHook = () => {
  const rows = countriesMockData;

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

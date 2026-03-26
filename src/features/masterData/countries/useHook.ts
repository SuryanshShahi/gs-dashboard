import { getCountries } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { countriesMockData } from "./mockData";
import type { CountryTableRow, ICountry } from "./types";

function computeStats(rows: CountryTableRow[]) {
  const total = rows.length;
  const active = rows.filter((r) => r.status === "ACTIVE").length;
  const inactive = rows.filter((r) => r.status === "INACTIVE").length;
  return { total, active, inactive };
}

const useHook = () => {
  const { data: countries, isLoading } = useQuery<ICountry[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const rows = useMemo<CountryTableRow[]>(() => {
    const list = Array.isArray(countries) ? countries : [];
    if (!list.length) return [];
    return list.map((c: ICountry, i: number) => ({
      id: c.id,
      flagEmoji: "🌍",
      name: c.name,
      isoCode: c.code,
      continent: "Asia",
      universities: 0,
      status: "ACTIVE",
    }));
  }, [countries]);

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

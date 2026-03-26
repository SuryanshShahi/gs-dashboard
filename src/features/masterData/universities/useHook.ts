import { getUniversities } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { IUniversity, UniversityTableRow } from "./types";

function computeStats(rows: UniversityTableRow[]) {
  const total = rows.length;
  const active = rows.filter((r) => r.status === "ACTIVE").length;
  const countriesCovered = new Set(rows.map((r) => r.countryName)).size;
  const totalPrograms = rows.reduce((acc, r) => acc + r.programs, 0);
  return { total, active, countriesCovered, totalPrograms };
}

const useHook = () => {
  const { data: universities, isLoading: isUniversitiesLoading, error } = useQuery<IUniversity[]>({
    queryKey: ["universities"],
    queryFn: () => getUniversities(),
  });


  const rows = useMemo<UniversityTableRow[]>(() => {
    const list = Array.isArray(universities) ? universities : [];
    if (!list.length) return [];

    return list.map((u: IUniversity, i: number) => ({
      id: u.id,
      name: u.name,
      city: u.city,
      countryName: u.country,
      flagEmoji: "🌍",
      type: 'Public',
      qsRanking: 0,
      programs: u._count.programs,
      status: u.isActive ? "ACTIVE" : "INACTIVE",
    }));
  }, [universities]);

  const stats = useMemo(() => computeStats(rows), [rows]);
  return {
    tableRows: rows,
    stats,
    isLoading: isUniversitiesLoading,
    isError: Boolean(error),
    error: error as Error | null,
  };
};

export default useHook;

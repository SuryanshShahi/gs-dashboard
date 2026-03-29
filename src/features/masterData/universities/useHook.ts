import { getUniversities, removeUniversity, updateUniversity } from "@/apis/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { IUniversity, IUpdateUniversity, UniversityTableRow } from "./types";
import { showToast } from "@/shared/ToastMessage";

function computeStats(rows: UniversityTableRow[]) {
  const total = rows.length;
  const active = rows.filter((r) => r.status === "ACTIVE").length;
  const countriesCovered = new Set(rows.map((r) => r.countryName)).size;
  const totalPrograms = rows.reduce((acc, r) => acc + r.programs, 0);
  return { total, active, countriesCovered, totalPrograms };
}

const useHook = () => {
  const queryClient = useQueryClient();
  const [selectedUniversity, setSelectedUniversity] = useState<UniversityTableRow | null>(null);
  const {
    data: universities,
    isLoading: isUniversitiesLoading,
    error,
  } = useQuery<IUniversity[]>({
    queryKey: ["universities"],
    queryFn: () => getUniversities(),
  });

  const rows = useMemo<UniversityTableRow[]>(() => {
    const list = Array.isArray(universities) ? universities : [];
    if (!list.length) return [];

    return list.map((u: IUniversity, i: number) => ({
      id: u.id,
      name: u.name,
      city: u.city?.name ?? "",
      countryName: u.country?.name ?? "",
      flagEmoji: "🌍",
      type: u.type,
      qsRanking: 0,
      programs: u._count.programs,
      status: u.isActive ? "ACTIVE" : "INACTIVE",
      isActive: u.isActive,
      website: u.website ?? "",
    }));
  }, [universities]);

  const stats = useMemo(() => computeStats(rows), [rows]);

  const {
    mutate: updateUniversityMutation,
    isPending: isUpdateUniversityPending,
    variables: updateUniversityVariables,
  } = useMutation({
    mutationFn: ({
      universityId,
      payload,
    }: {
      universityId: string;
      payload: IUpdateUniversity;
    }) => updateUniversity(universityId, payload),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<IUniversity[]>(["universities"], (old) => {
        if (!old) return old;
        return old.map((u) =>
          u.id === variables.universityId
            ? ({ ...u, ...variables.payload } as IUniversity)
            : u,
        );
      });
      void queryClient.invalidateQueries({ queryKey: ["universities"] });
    },
    onError: (err: any) => {
      showToast({
        type: "error",
        title: "Something went wrong!",
        subtitle: err?.response?.data?.message,
      });
    },
  });

  const {
    mutate: removeUniversityMutation,
    isPending: isRemoveUniversityPending,
    variables: removeUniversityVariables,
  } = useMutation({
    mutationFn: ({ universityId }: { universityId: string }) => removeUniversity(universityId),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<IUniversity[]>(["universities"], (old) => {
        if (!old) return old;
        return old.filter((u) => u.id !== variables.universityId);
      });
      void queryClient.invalidateQueries({ queryKey: ["universities"] });
    },
    onError: (err: any) => {
      showToast({
        type: "error",
        title: "Something went wrong!",
        subtitle: err?.response?.data?.message,
      });
    },
  });


  return {
    updateUniversityMutation,
    removeUniversityMutation,
    isRemoveUniversityPending,
    pendingUpdateUniversityId:
      isUpdateUniversityPending
        ? updateUniversityVariables?.universityId
        : null,
    pendingRemoveUniversityId:
      isRemoveUniversityPending
        ? removeUniversityVariables?.universityId
        : null,
    tableRows: rows,
    stats,
    isLoading: isUniversitiesLoading,
    isError: Boolean(error),
    error: error as Error | null,
    selectedUniversity,
    setSelectedUniversity,
  };
};

export default useHook;

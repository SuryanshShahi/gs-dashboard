import {
  getPrograms,
  removeProgram,
  updateProgram,
} from "@/apis/apis";
import { combine } from "@/utils/functions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { showToast } from "@/shared/ToastMessage";
import type { IProgram, IUpdateProgram, ProgramTableRow } from "./types";

function computeStats(rows: ProgramTableRow[]) {
  const total = rows.length;
  const active = rows.filter((r) => r.status === "ACTIVE").length;
  const universitiesCovered = new Set(rows.map((r) => r.universityName)).size;
  const countries = new Set(rows.map((r) => r.countryName)).size;
  return { total, active, universitiesCovered, countries };
}

const useHook = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<ProgramTableRow | null>(
    null,
  );

  const {
    data: programs,
    isLoading,
    isError,
    error,
  } = useQuery<IProgram[]>({
    queryKey: ["programs", search],
    queryFn: () => getPrograms(search),
  });

  const tableRows = useMemo<ProgramTableRow[]>(() => {
    if (!programs?.length) return [];

    return programs.map((p) => ({
      id: p.id,
      universityId: p.universityId,
      name: p.name,
      category: p.level,
      universityName: p.university?.name ?? "",
      countryName: p.university?.country?.name ?? "",
      flagEmoji: "🌍",
      duration: p.duration ?? "",
      studyMode: p.studyMode ?? "",
      intakes:
        Array.isArray(p.intakes) && p.intakes.length ? p.intakes : [],
      tuitionPerYear: combine(p.currency, p.tuitionFee),
      tuitionFee: p.tuitionFee,
      currency: p.currency,
      isActive: p.isActive,
      status: p.isActive ? "ACTIVE" : "INACTIVE",
    }));
  }, [programs]);

  const stats = useMemo(() => computeStats(tableRows), [tableRows]);

  const {
    mutate: updateProgramMutation,
    isPending: isUpdateProgramPending,
    variables: updateProgramVariables,
  } = useMutation({
    mutationFn: ({
      programId,
      payload,
    }: {
      programId: string;
      payload: IUpdateProgram;
    }) => updateProgram(programId, payload),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<IProgram[]>(["programs"], (old) => {
        if (!old) return old;
        return old.map((p) =>
          p.id === variables.programId
            ? ({ ...p, ...variables.payload } as IProgram)
            : p,
        );
      });
      void queryClient.invalidateQueries({ queryKey: ["programs"] });
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
    mutate: removeProgramMutation,
    isPending: isRemoveProgramPending,
    variables: removeProgramVariables,
  } = useMutation({
    mutationFn: ({ programId }: { programId: string }) =>
      removeProgram(programId),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<IProgram[]>(["programs"], (old) => {
        if (!old) return old;
        return old.filter((p) => p.id !== variables.programId);
      });
      void queryClient.invalidateQueries({ queryKey: ["programs"] });
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
    search,
    setSearch,
    tableRows,
    stats,
    isLoading,
    isError,
    error: error as Error | null,
    selectedProgram,
    setSelectedProgram,
    updateProgramMutation,
    removeProgramMutation,
    pendingUpdateProgramId:
      isUpdateProgramPending && updateProgramVariables
        ? updateProgramVariables.programId
        : null,
    pendingRemoveProgramId:
      isRemoveProgramPending && removeProgramVariables
        ? removeProgramVariables.programId
        : null,
  };
};

export default useHook;

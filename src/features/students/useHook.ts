import { activateStudent, archiveStudent, getStudents } from "@/apis/apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { IStudent, IStudentResponse, StudentTableRow } from "./types";
import { showToast } from "@/shared/ToastMessage";

function displayAvatarUrl(url: string): string {
  const u = url?.trim() ?? "";
  if (!u) return "";
  if (
    u.startsWith("http://") ||
    u.startsWith("https://") ||
    u.startsWith("/")
  ) {
    return u;
  }
  return "";
}

function mapIStudentToTableRow(s: IStudent): StudentTableRow {
  const name = `${s.firstName} ${s.lastName}`.trim() || "—";
  const c = s.counsellor;
  return {
    id: s.id,
    code: "S-" + s.id.slice(0, 8),
    name,
    email: s.personalEmail,
    contact: s.phone,
    avatar: displayAvatarUrl(s.profilePhotoUrl),
    counsellor: c
      ? {
          name: `${c.firstName} ${c.lastName}`.trim(),
          affiliation: s.partner?.companyName ?? "—",
        }
      : null,
    applications: 0,
    status: s.status,
  };
}

const useHook = () => {
  const {
    data: students,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<IStudentResponse>({
    queryKey: ["students"],
    queryFn: () => getStudents(),
  });

  const tableRows: StudentTableRow[] = useMemo(
    () => students?.data?.map(mapIStudentToTableRow) ?? [],
    [students],
  );

  const { mutate: onArchiveStudent, isPending: isArchiveStudentLoading } =
    useMutation({
      mutationFn: (studentId: string) => archiveStudent(studentId),
      onSuccess: refetch,
      onError: (err: any) => {
        showToast({
          type: "error",
          title: err?.response?.data?.message,
        });
      },
    });
  const { mutate: onActivateStudent, isPending: isActivateStudentLoading } =
    useMutation({
      mutationFn: (studentId: string) => activateStudent(studentId),
      onSuccess: refetch,
      onError: (err: any) => {
        showToast({
          type: "error",
          title: err?.response?.data?.message,
        });
      },
    });
  return {
    students,
    tableRows,
    isLoading,
    isError,
    error,
    onArchiveStudent,
    isArchiveStudentLoading,
    onActivateStudent,
    isActivateStudentLoading,
  };
};

export default useHook;

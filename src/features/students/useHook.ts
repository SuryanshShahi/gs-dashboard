import { getStudents } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { IStudent, IStudentResponse, StudentTableRow } from "./types";

function displayAvatarUrl(url: string): string {
    const u = url?.trim() ?? "";
    if (!u) return "";
    if (u.startsWith("http://") || u.startsWith("https://") || u.startsWith("/")) {
        return u;
    }
    return "";
}

function mapIStudentToTableRow(s: IStudent): StudentTableRow {
    const name = `${s.firstName} ${s.lastName}`.trim() || "—";
    const c = s.counsellor;
    return {
        id: s.id,
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
    };
}

const useHook = () => {
    const {
        data: students,
        isLoading,
        isError,
        error,
    } = useQuery<IStudentResponse>({
        queryKey: ["students"],
        queryFn: () => getStudents(),
    });

    const tableRows: StudentTableRow[] = useMemo(
        () => students?.data?.map(mapIStudentToTableRow) ?? [],
        [students],
    );

    return {
        students,
        tableRows,
        isLoading,
        isError,
        error,
    };
};

export default useHook;

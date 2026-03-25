/** Dashboard copy — replace with API metrics when available. */

export const overviewMetrics = [
  {
    id: "applications",
    label: "Total Applications",
    sublabel: "All time",
    value: 20,
    trend: "↑ 12%",
    trendPositive: true,
    iconTone: "blue" as const,
  },
  {
    id: "partners",
    label: "Active Partners",
    sublabel: "Onboarded agencies",
    value: 10,
    trend: null,
    trendPositive: true,
    iconTone: "purple" as const,
  },
  {
    id: "students",
    label: "Students Registered",
    sublabel: "Across all partners",
    value: 100,
    trend: "↑ 8%",
    trendPositive: true,
    iconTone: "teal" as const,
  },
  {
    id: "enrolled",
    label: "Enrolled This Year",
    sublabel: "Confirmed enrolments",
    value: 3,
    trend: "↑ 3%",
    trendPositive: true,
    iconTone: "green" as const,
  },
];

export const pendingGsReviewCount = 4;

export interface TopPartnerRow {
  rank: number;
  name: string;
  location: string;
  apps: number;
  avatarLetter: string;
  avatarClass: string;
}

export const topPartnersMock: TopPartnerRow[] = [
  {
    rank: 1,
    name: "IDP",
    location: "New Delhi, India",
    apps: 819,
    avatarLetter: "I",
    avatarClass: "bg-blue-100 text-blue-700",
  },
  {
    rank: 2,
    name: "Edurizon",
    location: "Chandigarh, India",
    apps: 351,
    avatarLetter: "E",
    avatarClass: "bg-purple-100 text-purple-700",
  },
  {
    rank: 3,
    name: "Crimson Consulting",
    location: "Noida, India",
    apps: 345,
    avatarLetter: "C",
    avatarClass: "bg-amber-100 text-amber-800",
  },
  {
    rank: 4,
    name: "StudyPro",
    location: "New Delhi, India",
    apps: 145,
    avatarLetter: "S",
    avatarClass: "bg-emerald-100 text-emerald-800",
  },
  {
    rank: 5,
    name: "EduNext",
    location: "Gurugram, India",
    apps: 124,
    avatarLetter: "E",
    avatarClass: "bg-rose-100 text-rose-800",
  },
];

export type RecentApplicationStage = "Draft" | "Pending GS" | "Partner Review";

export interface RecentApplicationRow {
  id: string;
  studentName: string;
  agency: string;
  university: string;
  intake: string;
  stage: RecentApplicationStage;
  updatedLabel: string;
}

/** Recent applications table — replace with API when available. */
export const recentApplicationsMock: RecentApplicationRow[] = [
  {
    id: "1",
    studentName: "Manish Karki",
    agency: "Fateh Education",
    university: "Simon Fraser University",
    intake: "Jan 2026",
    stage: "Draft",
    updatedLabel: "18 Mar 2025",
  },
  {
    id: "2",
    studentName: "Rahul Negi",
    agency: "Crimson Consulting",
    university: "London School of Economics",
    intake: "Sep 2026",
    stage: "Pending GS",
    updatedLabel: "18 Mar 2025",
  },
  {
    id: "3",
    studentName: "Deepak Joshi",
    agency: "Edurizon",
    university: "University of Edinburgh",
    intake: "Sep 2025",
    stage: "Partner Review",
    updatedLabel: "18 Mar 2025",
  },
  {
    id: "4",
    studentName: "Neha Thakur",
    agency: "EduNext",
    university: "University of British Columbia",
    intake: "Jan 2026",
    stage: "Draft",
    updatedLabel: "18 Mar 2025",
  },
  {
    id: "5",
    studentName: "Divya Sharma",
    agency: "StudyPro",
    university: "University of Bristol",
    intake: "Sep 2025",
    stage: "Partner Review",
    updatedLabel: "18 Mar 2025",
  },
  {
    id: "6",
    studentName: "Ananya Gupta",
    agency: "GrowNXT",
    university: "Australian National University",
    intake: "Feb 2026",
    stage: "Pending GS",
    updatedLabel: "17 Mar 2025",
  },
];

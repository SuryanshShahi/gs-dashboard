export interface Partner {
  id: string;
  name: string;
  logo: string;
  location: string;
  activeStudents: number;
  applications: number;
  pendingApplications: number | null;
  relationshipManager: {
    name: string;
    avatar: string;
  } | null;
}

export const partnersData: Partner[] = [
  {
    id: "#P-001",
    name: "EduNext",
    logo: "/assets/partners/edunext.png",
    location: "Gurugram, India",
    activeStudents: 124,
    applications: 124,
    pendingApplications: 12,
    relationshipManager: { name: "Payal Verma", avatar: "/assets/avatars/1.png" },
  },
  {
    id: "#P-002",
    name: "Crimson Consulting",
    logo: "/assets/partners/crimson.png",
    location: "Noida, India",
    activeStudents: 345,
    applications: 345,
    pendingApplications: null,
    relationshipManager: null,
  },
  {
    id: "#P-003",
    name: "Fateh Education",
    logo: "/assets/partners/fateh.png",
    location: "Kathmandu, Nepal",
    activeStudents: 67,
    applications: 67,
    pendingApplications: 3,
    relationshipManager: { name: "Nikhil Sharma", avatar: "/assets/avatars/2.png" },
  },
  {
    id: "#P-004",
    name: "StudyPro",
    logo: "/assets/partners/studypro.png",
    location: "New Delhi, India",
    activeStudents: 145,
    applications: 145,
    pendingApplications: null,
    relationshipManager: { name: "Sonali Kapoor", avatar: "/assets/avatars/3.png" },
  },
  {
    id: "#P-005",
    name: "EduAbroad",
    logo: "/assets/partners/eduabroad.png",
    location: "Chandigarh, India",
    activeStudents: 78,
    applications: 78,
    pendingApplications: null,
    relationshipManager: { name: "Payal Verma", avatar: "/assets/avatars/1.png" },
  },
  {
    id: "#P-006",
    name: "GrowNXT",
    logo: "/assets/partners/grownxt.png",
    location: "New Delhi, India",
    activeStudents: 24,
    applications: 24,
    pendingApplications: 14,
    relationshipManager: { name: "Sonali Kapoor", avatar: "/assets/avatars/3.png" },
  },
  {
    id: "#P-007",
    name: "IDP",
    logo: "/assets/partners/idp.png",
    location: "New Delhi, India",
    activeStudents: 819,
    applications: 819,
    pendingApplications: 21,
    relationshipManager: { name: "Nikhil Sharma", avatar: "/assets/avatars/2.png" },
  },
  {
    id: "#P-008",
    name: "Edurizon",
    logo: "/assets/partners/edurizon.png",
    location: "Chandigarh, India",
    activeStudents: 351,
    applications: 351,
    pendingApplications: 4,
    relationshipManager: { name: "Nikhil Sharma", avatar: "/assets/avatars/2.png" },
  },
  {
    id: "#P-009",
    name: "Edugen Study Abroad",
    logo: "/assets/partners/edugen.png",
    location: "Chandigarh, India",
    activeStudents: 56,
    applications: 56,
    pendingApplications: null,
    relationshipManager: { name: "Nikhil Sharma", avatar: "/assets/avatars/2.png" },
  },
  {
    id: "#P-010",
    name: "Hello Study Global",
    logo: "/assets/partners/hellostudy.png",
    location: "Amritsar, India",
    activeStudents: 10,
    applications: 10,
    pendingApplications: null,
    relationshipManager: { name: "Nikhil Sharma", avatar: "/assets/avatars/2.png" },
  },
];

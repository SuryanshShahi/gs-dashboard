export interface Student {
  id: string;
  name: string;
  email: string;
  contact: string;
  avatar: string;
  counsellor: {
    name: string;
    affiliation: string;
  } | null;
  applications: number;
}

export const studentsData: Student[] = [
  {
    id: "#GS-001",
    name: "Payal Verma",
    email: "payal.verma@outlook.com",
    contact: "+91 99999 99999",
    avatar: "",
    counsellor: { name: "Priyal Mangla", affiliation: "Global Scholar" },
    applications: 4,
  },
  {
    id: "#GS-002",
    name: "Shaurya Gupta",
    email: "shaurya.gupta@gmail.com",
    contact: "+91 88888 88888",
    avatar: "",
    counsellor: { name: "Nikhil Tyagi", affiliation: "StudyAbroad" },
    applications: 5,
  },
  {
    id: "#GS-003",
    name: "Aarav Sharma",
    email: "aarav.sharma@yahoo.com",
    contact: "+91 77777 77777",
    avatar: "",
    counsellor: { name: "Priyal Mangla", affiliation: "Global Scholar" },
    applications: 2,
  },
  {
    id: "#GS-004",
    name: "Maya Patel",
    email: "maya.patel@outlook.com",
    contact: "+91 66666 66666",
    avatar: "",
    counsellor: { name: "Nikhil Tyagi", affiliation: "StudyAbroad" },
    applications: 7,
  },
  {
    id: "#GS-005",
    name: "Rohit Iyer",
    email: "rohit.iyer@gmail.com",
    contact: "+91 55555 55555",
    avatar: "",
    counsellor: null,
    applications: 1,
  },
  {
    id: "#GS-006",
    name: "Neha Reddy",
    email: "neha.reddy@outlook.com",
    contact: "+91 44444 44444",
    avatar: "",
    counsellor: { name: "Priyal Mangla", affiliation: "Global Scholar" },
    applications: 3,
  },
  {
    id: "#GS-007",
    name: "Simran Kaur",
    email: "simran.kaur@gmail.com",
    contact: "+91 33333 33333",
    avatar: "",
    counsellor: { name: "Nikhil Tyagi", affiliation: "StudyAbroad" },
    applications: 6,
  },
  {
    id: "#GS-008",
    name: "Karan Singh",
    email: "karan.singh@yahoo.com",
    contact: "+91 22222 22222",
    avatar: "",
    counsellor: { name: "Priyal Mangla", affiliation: "Global Scholar" },
    applications: 4,
  },
  {
    id: "#GS-009",
    name: "Aditya Joshi",
    email: "aditya.joshi@outlook.com",
    contact: "+91 11111 11111",
    avatar: "",
    counsellor: null,
    applications: 2,
  },
  {
    id: "#GS-010",
    name: "Tanya Mehta",
    email: "tanya.mehta@gmail.com",
    contact: "+91 12345 67890",
    avatar: "",
    counsellor: { name: "Nikhil Tyagi", affiliation: "StudyAbroad" },
    applications: 8,
  },
];

export type MemberStatus = "active" | "invited" | "inactive" | "terminated";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastActive: string;
  status: MemberStatus;
}

export const teamMembersData: TeamMember[] = [
  {
    id: "#GS-001",
    name: "Payal Verma",
    email: "payal.verma@globalscholar.com",
    avatar: "/assets/avatars/1.png",
    lastActive: "20 hours ago",
    status: "active",
  },
  {
    id: "#GS-002",
    name: "Shaurya Gupta",
    email: "shaurya.gupta@globalscholar.com",
    avatar: "/assets/avatars/2.png",
    lastActive: "5 days ago",
    status: "active",
  },
  {
    id: "#GS-003",
    name: "Aarav Sharma",
    email: "aarav.sharma@globalscholar.com",
    avatar: "/assets/avatars/3.png",
    lastActive: "5 mins ago",
    status: "active",
  },
  {
    id: "#GS-004",
    name: "Maya Patel",
    email: "maya.patel@globalscholar.com",
    avatar: "/assets/avatars/4.png",
    lastActive: "22/1/2026",
    status: "active",
  },
  {
    id: "#GS-005",
    name: "Rohit Iyer",
    email: "rohit.iyer@globalscholar.com",
    avatar: "/assets/avatars/5.png",
    lastActive: "Never Logged In",
    status: "invited",
  },
  {
    id: "#GS-006",
    name: "Neha Reddy",
    email: "neha.reddy@globalscholar.com",
    avatar: "/assets/avatars/6.png",
    lastActive: "10 days ago",
    status: "active",
  },
  {
    id: "#GS-007",
    name: "Simran Kaur",
    email: "simran.kaur@globalscholar.com",
    avatar: "/assets/avatars/7.png",
    lastActive: "10 mins ago",
    status: "inactive",
  },
  {
    id: "#GS-008",
    name: "Karan Singh",
    email: "karan.singh@globalscholar.com",
    avatar: "/assets/avatars/8.png",
    lastActive: "2 days ago",
    status: "inactive",
  },
  {
    id: "#GS-009",
    name: "Aditya Joshi",
    email: "aditya.joshi@globalscholar.com",
    avatar: "/assets/avatars/9.png",
    lastActive: "1 month ago",
    status: "active",
  },
  {
    id: "#GS-010",
    name: "Tanya Mehta",
    email: "tanya.mehta@globalscholar.com",
    avatar: "/assets/avatars/10.png",
    lastActive: "1 min ago",
    status: "terminated",
  },
];

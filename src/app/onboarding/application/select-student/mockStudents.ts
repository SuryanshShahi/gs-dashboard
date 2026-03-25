export interface MockStudentCard {
  id: string;
  name: string;
  email: string;
  country: string;
}

export const MOCK_EXISTING_STUDENTS: MockStudentCard[] = [
  {
    id: "STU-001",
    name: "Rahul Sharma",
    email: "rahul@email.com",
    country: "India",
  },
  {
    id: "STU-002",
    name: "Priya Nair",
    email: "priya.nair@email.com",
    country: "India",
  },
  {
    id: "STU-003",
    name: "Arjun Mehta",
    email: "arjun.mehta@email.com",
    country: "India",
  },
  {
    id: "STU-004",
    name: "Sneha Desai",
    email: "sneha.desai@email.com",
    country: "UAE",
  },
];

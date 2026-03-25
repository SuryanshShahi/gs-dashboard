export type ApplicationStage =
  | "Draft"
  | "Partner Review"
  | "RM Review"
  | "Pending GS"
  | "GS Approved"
  | "Sent To University"
  | "Offer Received"
  | "Enrolled"
  | "Rejected";

export type ApplicationTabFilter =
  | "all"
  | "draft"
  | "under-review"
  | "approved"
  | "enrolled"
  | "rejected";

export interface ApplicationRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  partnerName: string;
  counsellorName: string;
  university: string;
  program: string;
  intake: string;
  stage: ApplicationStage;
  /** ISO date string */
  submittedAt: string;
}

export const UNDER_REVIEW_STAGES: ApplicationStage[] = [
  "Partner Review",
  "RM Review",
  "Sent To University",
  "Pending GS",
];

export const APPROVED_STAGES: ApplicationStage[] = [
  "GS Approved",
  "Offer Received",
];

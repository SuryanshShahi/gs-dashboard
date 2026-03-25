export type CountryStatus = "ACTIVE" | "INACTIVE";

/** Row for the Countries master data table. */
export interface CountryTableRow {
  id: string;
  flagEmoji: string;
  name: string;
  isoCode: string;
  continent: string;
  universities: number;
  status: CountryStatus;
}

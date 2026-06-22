/**
 * src/log.ts
 *
 * Appends a row to the checks-log CSV in the output directory.
 * Creates the file with a header if it doesn't exist yet.
 */

import fs from "node:fs";
import path from "node:path";

const CSV_FILENAME = "checks-log.csv";
const CSV_HEADER = "date,business,trade,suburb,top_finding,ai_visibility,gbp,website,reviews,directory,sent,replied,converted,amount";

/**
 * Escapes a CSV field value: wraps in quotes if the value contains
 * commas, double-quotes, or newlines; doubles any internal quotes.
 */
function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export interface LogRow {
  date: string;
  business: string;
  trade: string;
  suburb: string;
  top_finding: string;
  ai_visibility: string;
  gbp: string;
  website: string;
  reviews: string;
  directory: string;
}

/**
 * Ensures the output directory exists, then appends a row to the CSV log.
 * The operator-filled columns (sent, replied, converted, amount) are left empty.
 */
export function appendLog(dir: string, row: LogRow): void {
  fs.mkdirSync(dir, { recursive: true });

  const csvPath = path.join(dir, CSV_FILENAME);
  const needsHeader = !fs.existsSync(csvPath);

  const fields = [
    row.date,
    row.business,
    row.trade,
    row.suburb,
    row.top_finding,
    row.ai_visibility,
    row.gbp,
    row.website,
    row.reviews,
    row.directory,
    "", // sent — operator fills
    "", // replied — operator fills
    "", // converted — operator fills
    "", // amount — operator fills
  ].map(csvEscape);

  const line = fields.join(",") + "\n";

  if (needsHeader) {
    fs.writeFileSync(csvPath, CSV_HEADER + "\n", "utf8");
  }

  fs.appendFileSync(csvPath, line, "utf8");
}

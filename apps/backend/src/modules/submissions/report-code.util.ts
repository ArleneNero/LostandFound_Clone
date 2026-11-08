import { foundSubmissions } from "../../db/schema.js";
import { sql, eq } from "drizzle-orm";
import type { DbTransaction } from "../../db/index.js";

export async function generateReportCode(tx: DbTransaction, year?: number): Promise<string> {
  const currentYear = year || new Date().getFullYear();
  const prefix = `REP-${currentYear}-`;

  const [result] = await tx
    .select({
      count: sql<number>`count(*)::int`,
    })
    .from(foundSubmissions)
    .where(sql`${foundSubmissions.reportCode} LIKE ${prefix + "%"}`);

  let nextSeq = (result?.count || 0) + 1;
  let candidate = `${prefix}${String(nextSeq).padStart(4, "0")}`;

  while (true) {
    const existing = await tx.query.foundSubmissions.findFirst({
      where: eq(foundSubmissions.reportCode, candidate),
    });
    if (!existing) {
      break;
    }
    nextSeq++;
    candidate = `${prefix}${String(nextSeq).padStart(4, "0")}`;
  }

  return candidate;
}

/**
 * web/lib/leads.ts
 *
 * Durable lead capture into Neon Postgres. Every check/contact submission is
 * stored here in addition to being emailed.
 *
 * Connection string comes from DATABASE_URL (Neon). If it's unset the module
 * no-ops gracefully (logs a stub) so local dev and unconfigured environments
 * keep working — same pattern as lib/email.ts. captureLead() never throws.
 */

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export type LeadRecord = {
  source: "ai-visibility-check" | "contact" | string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  businessType?: string;
  website?: string;
  message?: string;
};

const CONNECTION = process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";

// Cache the client + the "table exists" check across warm invocations.
let client: NeonQueryFunction<false, false> | null = null;
let ensured: Promise<void> | null = null;

function getClient(): NeonQueryFunction<false, false> | null {
  if (!CONNECTION) return null;
  if (!client) client = neon(CONNECTION);
  return client;
}

async function ensureTable(sql: NeonQueryFunction<false, false>): Promise<void> {
  if (!ensured) {
    ensured = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          created_at    timestamptz NOT NULL DEFAULT now(),
          source        text NOT NULL,
          name          text,
          company       text,
          email         text,
          phone         text,
          suburb        text,
          business_type text,
          website       text,
          message       text
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email)`;
    })().catch((err) => {
      // Reset so a later request can retry the migration.
      ensured = null;
      throw err;
    });
  }
  return ensured;
}

/**
 * Store a lead. Returns { stored } — never throws. A storage failure must not
 * break the enquiry email or the form response.
 */
export async function captureLead(lead: LeadRecord): Promise<{ stored: boolean }> {
  const sql = getClient();
  if (!sql) {
    console.log("[leads-stub]", JSON.stringify(lead));
    return { stored: false };
  }

  try {
    await ensureTable(sql);
    await sql`
      INSERT INTO leads (source, name, company, email, phone, suburb, business_type, website, message)
      VALUES (
        ${lead.source},
        ${lead.name || null},
        ${lead.company || null},
        ${lead.email || null},
        ${lead.phone || null},
        ${lead.suburb || null},
        ${lead.businessType || null},
        ${lead.website || null},
        ${lead.message || null}
      )
    `;
    return { stored: true };
  } catch (err) {
    console.error("[leads] store failed:", err instanceof Error ? err.message : err);
    return { stored: false };
  }
}

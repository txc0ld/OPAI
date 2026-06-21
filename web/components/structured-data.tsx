import { JsonLd } from "@/components/json-ld";
import { buildOrganization, buildWebsite, buildLocalBusiness, wrapGraph } from "@/lib/schema";

export function StructuredData() {
  return <JsonLd schema={wrapGraph([buildOrganization(), buildWebsite(), buildLocalBusiness()])} />;
}

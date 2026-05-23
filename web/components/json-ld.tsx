type JsonLdProps = {
  schema: Record<string, unknown>;
};

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // schema is constructed server-side from typed builders; safe to stringify.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

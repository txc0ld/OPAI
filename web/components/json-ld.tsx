type JsonLdProps = {
  schema: Record<string, unknown>;
};

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" to < so no field value can break out of the <script> tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}

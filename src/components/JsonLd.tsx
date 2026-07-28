/**
 * Renders a schema.org JSON-LD block. Server-only by design — the payload has
 * to be in the initial HTML, because Google's rich-result parsers read the
 * served document and don't wait for client hydration.
 *
 * dangerouslySetInnerHTML is the documented way to emit JSON-LD in Next: React
 * would otherwise HTML-escape the JSON and break the parse. Everything passed
 * here comes from our own data files, never from user input.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

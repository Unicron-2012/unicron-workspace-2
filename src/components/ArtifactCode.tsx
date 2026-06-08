export default function ArtifactCode() {
  return (
    <pre className="overflow-auto rounded-2xl border border-white/10 bg-black/30 p-5 text-sm">
{`export async function generateStrategy() {
  return {
    market: "Enterprise",
    growth: "Product Led",
    pricing: "Usage Based",
  };
}`}
    </pre>
  );
}
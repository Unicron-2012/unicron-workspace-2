const metrics = [
  {
    label: "Words",
    value: "1,248",
  },
  {
    label: "Tokens",
    value: "2,894",
  },
  {
    label: "Read Time",
    value: "5 min",
  },
  {
    label: "Confidence",
    value: "96%",
  },
];

export default function ArtifactAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {metrics.map((item) => (
        <div
          key={item.label}
          className="glass rounded-2xl p-5"
        >
          <p className="text-sm text-slate-400">
            {item.label}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
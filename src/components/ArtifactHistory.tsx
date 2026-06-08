const versions = [
  "Version 1 - Initial Draft",
  "Version 2 - Revised Strategy",
  "Version 3 - Analytics Added",
  "Version 4 - Final Review",
];

export default function ArtifactHistory() {
  return (
    <div className="space-y-3">
      {versions.map((version) => (
        <div
          key={version}
          className="glass rounded-xl p-4"
        >
          {version}
        </div>
      ))}
    </div>
  );
}
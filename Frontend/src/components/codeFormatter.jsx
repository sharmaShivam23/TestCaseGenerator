// components/SummaryFormatter.jsx
export default function CodeFormatter({ text }) {
  const lines = text.split("\n").filter(Boolean);

  const getStyle = (line) => {
    if (line.toLowerCase().includes("positive")) return "text-green-400 font-semibold";
    if (line.toLowerCase().includes("edge")) return "text-yellow-400 font-semibold";
    if (line.toLowerCase().includes("negative")) return "text-red-400 font-semibold";
    return "text-white/80";
  };

  return (
    <div className="space-y-1">
      {lines.map((line, idx) => (
        <p key={idx} className={getStyle(line)}>
          {line.startsWith("###") || line.startsWith("####") ? (
            <span className="block text-lg font-bold">{line.replace(/#+/g, "").trim()}</span>
          ) : (
            line
          )}
        </p>
      ))}
    </div>
  );
}

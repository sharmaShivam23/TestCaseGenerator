
import React from "react";

export default function SummaryFormatter({ text }) {
  if (!text) return null;

  const lines = text.split("\n").filter(Boolean);

  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        if (line.startsWith("### ")) {
          return (
            <h2 key={idx} className="text-2xl font-bold text-violet-400 mt-4">
              {line.replace("### ", "📝 ")}
            </h2>
          );
        }
        if (line.startsWith("#### Positive")) {
          return (
            <h3 key={idx} className="text-green-400 text-lg font-semibold mt-3">
              ✅ {line.replace("#### ", "")}
            </h3>
          );
        }
        if (line.startsWith("#### Edge")) {
          return (
            <h3 key={idx} className="text-yellow-400 text-lg font-semibold mt-3">
              ⚡ {line.replace("#### ", "")}
            </h3>
          );
        }
        if (line.startsWith("#### Negative")) {
          return (
            <h3 key={idx} className="text-red-400 text-lg font-semibold mt-3">
              ❌ {line.replace("#### ", "")}
            </h3>
          );
        }
        if (line.trim().startsWith("-")) {
          return (
            <li key={idx} className="ml-6 list-disc text-white/80">
              {line.replace("- ", "")}
            </li>
          );
        }
        return (
          <p key={idx} className="text-white/70">
            {line}
          </p>
        );
      })}
    </div>
  );
}

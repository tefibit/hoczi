"use client";

import { useState } from "react";
import { questions } from "./data";

function tokenize(line: string): { type: string; value: string }[] {
  const tokens: { type: string; value: string }[] = [];
  let remaining = line;

  const patterns: [string, RegExp][] = [
    ["keyword", /^(function|var|let|const|return|for|if|else|of|new|this|=>)(?!\w)/],
    ["builtin", /^(console|Math)\b/],
    ["method", /^\.(log|error|warn|PI)\b/],
    ["string", /^'[^']*'/],
    ["number", /^\b\d+\.?\d*\b/],
    ["identifier", /^[a-zA-Z_$][a-zA-Z0-9_$]*/],
    ["operator", /^[=+\-*/<>!&|?:]+/],
    ["punct", /^[{}()\[\],;.]/],
    ["space", /^\s+/],
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const [type, regex] of patterns) {
      const m = remaining.match(regex);
      if (m) {
        tokens.push({ type, value: m[0] });
        remaining = remaining.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ type: "plain", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }
  return tokens;
}

const tokenColors: Record<string, string> = {
  keyword: "#c792ea",
  builtin: "#82aaff",
  method: "#82aaff",
  string: "#c3e88d",
  number: "#f78c6c",
  identifier: "#eeffff",
  operator: "#89ddff",
  punct: "#cdd3de",
  space: "inherit",
  plain: "#cdd3de",
};

function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      className="p-6 text-sm leading-relaxed font-mono overflow-x-auto rounded-t-xl"
      style={{ background: "#1a2b2e", color: "#cdd3de" }}
    >
      {code.split("\n").map((line, i) => (
        <div key={i} className="min-h-[1.5em]">
          {tokenize(line).map((tok, j) => (
            <span key={j} style={{ color: tokenColors[tok.type] }}>
              {tok.value}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code className="px-1.5 py-0.5 rounded text-xs font-mono bg-gray-100 text-gray-700">
      {children}
    </code>
  );
}

function ExplanationText({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <InlineCode key={i}>{part}</InlineCode> : <span key={i}>{part}</span>
      )}
    </>
  );
}

const Background = () => (
  <>
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, #3D0E5E 0%, #8B1A6A 40%, #C0382A 70%, #D4561C 100%)",
      }}
    />
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[580, 480, 380, 290, 210, 140, 80].map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: r * 2,
            height: r * 1.9,
            left: "20%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            border: `${38 - i * 4}px solid rgba(255,255,255,0.07)`,
          }}
        />
      ))}
    </div>
  </>
);

function ScorePage({
  answers,
  onRestart,
}: {
  answers: Record<number, string>;
  onRestart: () => void;
}) {
  const total = questions.length;
  const score = questions.filter((q) => answers[q.id - 1] === q.answer).length;
  const pct = Math.round((score / total) * 100);

  let message = "Keep practicing!";
  if (pct === 100) message = "Perfect score!";
  else if (pct >= 80) message = "Great job!";
  else if (pct >= 60) message = "Not bad!";

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <Background />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Your score</p>
          <p className="text-white font-bold" style={{ fontSize: "5rem", lineHeight: 1 }}>
            {score}<span className="text-white/40 text-4xl font-normal">/{total}</span>
          </p>
          <p className="text-white/80 text-xl mt-3">{message}</p>
        </div>

        <div className="w-full bg-white rounded-xl overflow-hidden mb-8">
          {questions.map((q, i) => {
            const chosen = answers[i];
            const correct = chosen === q.answer;
            return (
              <div
                key={q.id}
                className="flex items-start gap-3 px-5 py-4 border-b border-gray-100 last:border-0"
              >
                <span
                  className="mt-0.5 text-sm font-bold shrink-0"
                  style={{ color: correct ? "#166534" : "#991b1b" }}
                >
                  {correct ? "✓" : "✗"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-sm font-medium truncate">
                    {q.id}. {q.question}
                  </p>
                  {!correct && chosen && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      You chose <span className="font-mono">{chosen}</span>, answer was{" "}
                      <span className="font-mono">{q.answer}</span>
                    </p>
                  )}
                  {!chosen && (
                    <p className="text-xs text-gray-400 mt-0.5">Not answered</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onRestart}
          className="w-64 py-4 bg-white rounded-xl text-gray-900 font-medium text-lg hover:bg-gray-100 active:scale-95 transition-all"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const total = questions.length;
  const selected = answers[current] ?? null;
  const revealed = selected !== null;
  const isCorrect = selected === q.answer;
  const isLast = current === total - 1;

  const handleSelect = (label: string) => {
    if (!revealed) setAnswers((prev) => ({ ...prev, [current]: label }));
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrent(0);
    setFinished(false);
  };

  const getOptionClasses = (label: string): string => {
    const base = "w-full text-left px-6 py-4 font-mono text-sm transition-all duration-150";
    const divider = "border-b border-gray-100";

    if (!revealed) {
      return `${base} ${divider} text-gray-800 hover:bg-gray-50 cursor-pointer`;
    }
    if (label === q.answer) {
      return `${base} ${divider} bg-green-50 text-green-900 border-l-4 border-l-green-400`;
    }
    if (label === selected) {
      return `${base} ${divider} bg-red-50 text-red-900 border-l-4 border-l-red-400`;
    }
    return `${base} ${divider} text-gray-300 cursor-default`;
  };

  if (finished) {
    return <ScorePage answers={answers} onRestart={handleRestart} />;
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <Background />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-12 max-w-2xl mx-auto w-full">

        {/* Question title */}
        <h2 className="text-white text-2xl font-semibold mb-5">
          {q.id}. {q.question}
        </h2>

        {/* Code block */}
        <CodeBlock code={q.code} />

        {/* Answer options */}
        <div className="bg-white overflow-hidden">
          {q.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              disabled={revealed}
              className={getOptionClasses(opt.label)}
            >
              <span className="text-gray-400 mr-2">{opt.label}:</span>
              {opt.text}
            </button>
          ))}
        </div>

        {/* Explanation panel */}
        {revealed && (
          <div className="bg-white border-t border-gray-100 rounded-b-xl px-6 py-5 animate-in fade-in slide-in-from-top-1 duration-200">
            <p
              className="font-semibold text-sm mb-2 flex items-center gap-1.5"
              style={{ color: isCorrect ? "#166534" : "#991b1b" }}
            >
              <span>{isCorrect ? "✓" : "✗"}</span>
              <span>{isCorrect ? "Correct!" : "Incorrect."}</span>
              <span className="ml-1 font-mono">Answer: {q.answer}</span>
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              <ExplanationText text={q.explanation} />
            </p>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="relative z-10 flex items-center justify-between px-6 pb-10 max-w-2xl mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="w-28 py-3 rounded-lg bg-white/10 text-white font-medium text-sm hover:bg-white/20 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <span className="text-white/60 text-sm font-medium italic">
          {current + 1} of {total}
        </span>

        <button
          onClick={handleNext}
          disabled={!revealed}
          className="w-28 py-3 rounded-lg text-white font-medium text-sm active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "#6B2A7A" }}
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
    </main>
  );
}

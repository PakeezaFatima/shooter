"use client";

import React from "react";

export default function BubbleShooter() {
  const [bubbles, setBubbles] = React.useState([]);
  const [score, setScore] = React.useState(0);

  // Spawn a new bubble every 1.5s
  React.useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const x = Math.random() * 80 + 10; // random X (10–90%)
      const y = Math.random() * 60 + 10; // random Y (10–70%)
      setBubbles((prev) => [...prev, { id, x, y }]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  function popBubble(id) {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 overflow-hidden">
      {/* Scoreboard */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg text-lg font-bold text-indigo-600">
        Score: {score}
      </div>

      {/* Game Area */}
      <div className="relative w-full h-screen">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            onClick={() => popBubble(bubble.id)}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-red-500 shadow-lg cursor-pointer animate-bounce"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        ))}
      </div>
    </main>
  );
}

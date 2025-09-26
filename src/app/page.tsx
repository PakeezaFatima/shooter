"use client";

import { useState, useEffect } from "react";

export default function BubbleShooter() {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);

  // Spawn bubbles every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const x = Math.random() * 80 + 10; // between 10% and 90%
      const y = Math.random() * 60 + 20; // between 20% and 80%
      setBubbles((prev) => [...prev, { id, x, y }]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const popBubble = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 overflow-hidden">
      {/* Scoreboard */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg text-lg font-bold text-indigo-600">
        Score: {score}
      </div>

      {/* Game Area */}
      <div className="relative w-full h-screen">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => popBubble(bubble.id)}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-red-500 shadow-lg cursor-pointer animate-bounce"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </main>
  );
}

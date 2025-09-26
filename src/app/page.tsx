"use client";

import React, { useRef, useEffect, useState } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState({ me: 0, ai: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 400;

    let ball = { x: 300, y: 200, r: 12, vx: 3, vy: 2 };
    let paddleMe = { x: 300, y: 380, w: 100, h: 10 };
    let paddleAi = { x: 300, y: 20, w: 100, h: 10 };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // paddles
      ctx.fillStyle = "#0ea5a4";
      ctx.fillRect(paddleMe.x - paddleMe.w / 2, paddleMe.y, paddleMe.w, paddleMe.h);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(paddleAi.x - paddleAi.w / 2, paddleAi.y, paddleAi.w, paddleAi.h);

      // ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.closePath();

      // score
      ctx.fillStyle = "#111";
      ctx.font = "16px sans-serif";
      ctx.fillText(`You: ${score.me}`, 10, 390);
      ctx.fillText(`AI: ${score.ai}`, 520, 20);
    };

    const update = () => {
      ball.x += ball.vx;
      ball.y += ball.vy;

      // wall bounce
      if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) {
        ball.vx *= -1;
      }

      // paddle collisions
      if (
        ball.y + ball.r > paddleMe.y &&
        ball.x > paddleMe.x - paddleMe.w / 2 &&
        ball.x < paddleMe.x + paddleMe.w / 2
      ) {
        ball.vy *= -1;
      }
      if (
        ball.y - ball.r < paddleAi.y + paddleAi.h &&
        ball.x > paddleAi.x - paddleAi.w / 2 &&
        ball.x < paddleAi.x + paddleAi.w / 2
      ) {
        ball.vy *= -1;
      }

      // scoring
      if (ball.y - ball.r < 0) {
        setScore((s) => ({ ...s, me: s.me + 1 }));
        ball = { x: 300, y: 200, r: 12, vx: 3, vy: 2 };
      }
      if (ball.y + ball.r > canvas.height) {
        setScore((s) => ({ ...s, ai: s.ai + 1 }));
        ball = { x: 300, y: 200, r: 12, vx: 3, vy: -2 };
      }
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };
    loop();
  }, [score]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Simple Volleyball Game</h1>
      <canvas ref={canvasRef} className="border rounded-lg shadow-md" />
      <p className="text-sm text-gray-600 mt-2">Use mouse to move paddle (AI auto plays)</p>
    </main>
  );
}

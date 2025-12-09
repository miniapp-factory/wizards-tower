"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { title, url } from "@/lib/metadata";

const fruits = ["btc", "eth", "xrp", "solana", "doge"] as const;
type Fruit = typeof fruits[number];

function randomFruit(): Fruit {
  return fruits[Math.floor(Math.random() * fruits.length)];
}

export default function SlotMachine() {
  const [grid, setGrid] = useState<Fruit[][]>([
    [randomFruit(), randomFruit(), randomFruit()],
    [randomFruit(), randomFruit(), randomFruit()],
    [randomFruit(), randomFruit(), randomFruit()],
  ]);
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState(false);

  // Check win condition directly via conditional rendering
  const hasWin =
    // rows
    (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) ||
    (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) ||
    (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) ||
    // columns
    (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) ||
    (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) ||
    (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]);

  useEffect(() => {
    if (hasWin) setWin(true);
  }, [hasWin]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWin(false);
    const interval = setInterval(() => {
      setGrid((prev) => [
        [randomFruit(), randomFruit(), randomFruit()],
        [prev[0][0], prev[0][1], prev[0][2]],
        [prev[1][0], prev[1][1], prev[1][2]],
      ]);
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.flat().map((fruit, idx) => (
          <img
            key={idx}
            src={`/${fruit}.png`}
            alt={fruit}
            width={64}
            height={64}
            className="rounded-md"
          />
        ))}
      </div>
      <Button onClick={spin} disabled={spinning} variant="outline">
        {spinning ? "Spinning..." : "Spin"}
      </Button>
      {win && (
        <div className="flex flex-col items-center gap-2 mt-4">
          <span className="text-xl font-semibold text-green-600">You Win!</span>
          <Share text={`${title} ${url}`} />
        </div>
      )}
    </div>
  );
}

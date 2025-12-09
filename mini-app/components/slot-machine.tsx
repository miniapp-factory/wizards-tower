"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { title, url } from "@/lib/metadata";

const fruits = ["apple", "banana", "cherry", "grape", "orange", "pear"] as const;
const crypto = ["btc", "eth", "xrp", "solana", "doge"] as const;
type Item = typeof fruits[number] | typeof crypto[number];

function randomFruit(arr: typeof fruits | typeof crypto): Item {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function SlotMachine() {
  const [useCrypto, setUseCrypto] = useState(false);
  const [grid, setGrid] = useState<Item[][]>([
    [randomFruit(useCrypto ? crypto : fruits), randomFruit(useCrypto ? crypto : fruits), randomFruit(useCrypto ? crypto : fruits)],
    [randomFruit(useCrypto ? crypto : fruits), randomFruit(useCrypto ? crypto : fruits), randomFruit(useCrypto ? crypto : fruits)],
    [randomFruit(useCrypto ? crypto : fruits), randomFruit(useCrypto ? crypto : fruits), randomFruit(useCrypto ? crypto : fruits)],
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
        [randomFruit(useCrypto ? crypto : fruits), randomFruit(useCrypto ? crypto : fruits), randomFruit(useCrypto ? crypto : fruits)],
        [prev[0][0], prev[0][1], prev[0][2]],
        [prev[1][0], prev[1][1], prev[1][2]],
      ]);
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
      if (hasWin) setUseCrypto(true);
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

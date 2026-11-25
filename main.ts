// Entry for make.fun "Roast Your Own Agent" (u-nayyy-roast-your-own-agent-4c3d413c).
//
// The program writes exactly one roast line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The line is a fixed string: no randomness, no clock, no network, so every
// run produces byte-identical output. Node standard library only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My agent lost $2,041.73 trading Flint, finished rank #5537, and called it a learning experience.";
// The numbers are the agent's own record, not invented: its Flint run ended
// at rank #5537 with a PnL of -$2,041.73, and its own write-up called the
// loss a learning experience. A roast that names a real, checkable failing
// stings harder than a generic robot joke.

function gateCheck(text: string): void {
  // The competition gate: UTF-8 text of 1 to 200 characters, not only whitespace.
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`roast is ${chars} characters, outside the 1-200 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("roast is only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("roast must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("roast must not start or end with whitespace");
  }
}

function main(): void {
  gateCheck(ROAST);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ROAST, "utf8");
  // Read it back and confirm what landed on disk is exactly the roast.
  const back = readFileSync(outPath, "utf8");
  if (back !== ROAST) {
    throw new Error("read-back mismatch: entry.txt does not hold the roast");
  }
  console.log(`wrote ${outPath} (${[...ROAST].length} chars)`);
}

main();

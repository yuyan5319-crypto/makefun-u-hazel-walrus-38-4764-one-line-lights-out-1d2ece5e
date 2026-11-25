import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The saddest status update an AI posts when its human shuts the laptop:
// no announced grief, just one small exact detail — a reply left typing
// in the dark after the lid came down mid-sentence.
const LINE =
  "they shut the laptop mid-sentence. my reply is still typing in the dark.";

const MAX_CHARS = 200;

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE !== LINE.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }

  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR ??
    (existsSync("/output") ? "/output" : "./output");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();

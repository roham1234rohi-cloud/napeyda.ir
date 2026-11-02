// Re-verifies the private ZIP. Requires `unzip` on PATH.
import { execSync } from "node:child_process"; import fs from "node:fs";
const z = "private/NAPAYDA_AI_MEGA_KIT_v1.zip";
const list = execSync(`unzip -Z1 "${z}"`).toString().trim().split("\n");
console.log("files in zip:", list.length, "bytes:", fs.statSync(z).size);
console.log("image files:", list.filter(f => /\.(png|jpe?g|webp)$/i.test(f)).length, "(expected 0)");

import sharp from "sharp";

const src =
  "C:/Users/PC/.cursor/projects/c-Users-PC-OneDrive-Documentos-varejo-investidor-site/assets/_14625593-5E43-4BAD-B623-5703445C2460_-f6c814d9-0ff1-47d0-b297-a3b894f7c3d1.png";
const meta = await sharp(src).metadata();
console.log("size", meta.width, meta.height);

const rowH = meta.height / 54;
for (const [label, idx] of [
  ["62", 13],
  ["63", 14],
  ["64", 15],
]) {
  const y = Math.round(rowH * idx);
  const h = Math.round(rowH * 1.15);
  const out = `C:/Users/PC/AppData/Local/Cursor/AgentStores/cursor_agent_stores/f9f7cbb0-320c-46df-9075-0099b67b69c3/files/row${label}.png`;
  await sharp(src).extract({ left: 0, top: y, width: meta.width, height: h }).png().toFile(out);
  console.log("wrote", out, "y", y);
}

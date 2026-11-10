import sharp from "sharp";

const src =
  "C:/Users/PC/.cursor/projects/c-Users-PC-OneDrive-Documentos-varejo-investidor-site/assets/_14625593-5E43-4BAD-B623-5703445C2460_-f6c814d9-0ff1-47d0-b297-a3b894f7c3d1.png";
const meta = await sharp(src).metadata();
const rowH = meta.height / 54;
const y = Math.round(rowH * 14);
const h = Math.round(rowH * 1.15);
const left = Math.round(meta.width * 0.52);
const width = meta.width - left;
const out = `C:/Users/PC/AppData/Local/Cursor/AgentStores/cursor_agent_stores/f9f7cbb0-320c-46df-9075-0099b67b69c3/files/63tail.png`;
await sharp(src).extract({ left, top: y, width, height: h }).resize({ width: width * 3 }).png().toFile(out);
console.log("wrote", out);

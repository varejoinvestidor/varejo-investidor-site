import sharp from "sharp";

const src =
  "C:/Users/PC/.cursor/projects/c-Users-PC-OneDrive-Documentos-varejo-investidor-site/assets/_0195B81D-E2AC-41B7-B153-11E5C28FD35B_-3cd1089f-ae92-4755-8fb2-9bb0999bebb3.png";
const meta = await sharp(src).metadata();
const firstSignal = 103;
const visible = 25;
const rowH = meta.height / visible;

for (let sig = 115; sig <= 122; sig++) {
  const idx = sig - firstSignal;
  const y = Math.round(rowH * idx);
  const h = Math.round(rowH * 1.02);
  const left = Math.round(meta.width * 0.68);
  const width = meta.width - left;
  const out = `C:/Users/PC/AppData/Local/Cursor/AgentStores/cursor_agent_stores/f9f7cbb0-320c-46df-9075-0099b67b69c3/files/sig${sig}pips.png`;
  await sharp(src).extract({ left, top: y, width, height: h }).resize({ width: width * 4 }).png().toFile(out);
  console.log(sig, "y", y);
}

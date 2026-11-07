import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, rename, rm } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { EdgeTTS } from "node-edge-tts";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "content", "reels", "pos-padrao-ouro");
const mp4Out = path.join(outDir, "pos-padrao-ouro-instagram.mp4");
const PORT = 3199;
const REEL_DURATION_SEC = 100;
const FFMPEG = ffmpegInstaller.path;

function waitForPort(port, timeoutMs = 120_000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const socket = new net.Socket();
      socket.setTimeout(1500);
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() - started > timeoutMs) reject(new Error("Server timeout"));
        else setTimeout(tryOnce, 400);
      });
      socket.once("timeout", () => {
        socket.destroy();
        setTimeout(tryOnce, 400);
      });
      socket.connect(port, "127.0.0.1", () => {
        socket.end();
        resolve();
      });
    };
    tryOnce();
  });
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...opts,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited ${code}`));
    });
  });
}

async function synthNarration() {
  const text = await readFile(path.join(outDir, "narracao-tts.txt"), "utf8");
  const voiceMp3 = path.join(outDir, "_narration.mp3");
  const tts = new EdgeTTS({
    voice: "pt-BR-AntonioNeural",
    lang: "pt-BR",
    outputFormat: "audio-24khz-48kbitrate-mono-mp3",
    rate: "-4%",
    pitch: "-2Hz",
    timeout: 120_000,
  });
  await tts.ttsPromise(text.trim(), voiceMp3);
  return voiceMp3;
}

async function recordReel(tmpDir) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: tmpDir,
      size: { width: 1080, height: 1920 },
    },
  });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${PORT}/reels/pos-padrao-ouro?export=1`, {
    waitUntil: "networkidle",
  });
  await page.waitForSelector("#reel-export-root", { timeout: 30_000 });
  await page.waitForTimeout(REEL_DURATION_SEC * 1000 + 800);
  await page.close();
  await context.close();
  await browser.close();

  const { readdir } = await import("node:fs/promises");
  const files = await readdir(tmpDir);
  const webm = files.find((f) => f.endsWith(".webm"));
  if (!webm) throw new Error("Playwright não gerou webm");
  return path.join(tmpDir, webm);
}

async function muxVideo(webmPath, narrationMp3, videoOnlyPath, finalPath) {
  await run(FFMPEG, [
    "-y",
    "-i",
    webmPath,
    "-t",
    String(REEL_DURATION_SEC),
    "-vf",
    "fps=30,scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-an",
    videoOnlyPath,
  ]);

  await run(FFMPEG, [
    "-y",
    "-i",
    videoOnlyPath,
    "-i",
    narrationMp3,
    "-filter:a",
    "atempo=1.08",
    "-map",
    "0:v",
    "-map",
    "1:a",
    "-t",
    String(REEL_DURATION_SEC),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
    finalPath,
  ]);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const tmpDir = path.join(outDir, "_export_tmp");
  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });

  if (process.env.SKIP_BUILD !== "1") {
    console.log("→ Build Next.js…");
    await run("npm", ["run", "build"], { cwd: root });
  }

  console.log("→ Narração (voz masculina PT-BR)…");
  const narrationMp3 = await synthNarration();

  console.log(`→ Servidor :${PORT}…`);
  const server = spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
    cwd: root,
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env },
  });
  let serverLog = "";
  server.stdout?.on("data", (d) => {
    serverLog += d.toString();
  });
  server.stderr?.on("data", (d) => {
    serverLog += d.toString();
  });

  try {
    await waitForPort(PORT);
    console.log("→ Gravando animação 1080×1920…");
    const webm = await recordReel(tmpDir);
    const videoOnly = path.join(tmpDir, "video-only.mp4");
    console.log("→ Mix vídeo + áudio (MP4)…");
    await muxVideo(webm, narrationMp3, videoOnly, mp4Out);
    console.log(`\n✓ Entrega: ${mp4Out}`);
  } finally {
    server.kill("SIGTERM");
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

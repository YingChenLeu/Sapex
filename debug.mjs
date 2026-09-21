import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("console", (m) => console.log("[console]", m.type(), m.text()));
page.on("pageerror", (e) => console.log("[pageerror]", e.message));

await page.goto("http://localhost:5202/", { waitUntil: "networkidle" });
await page.evaluate(() => document.getElementById("intro-splash")?.remove());
await page.waitForTimeout(3000);

const info = await page.evaluate(() => {
  const canvases = [...document.querySelectorAll("canvas")].map((c) => {
    const r = c.getBoundingClientRect();
    const parent = c.parentElement;
    const pr = parent?.getBoundingClientRect();
    return {
      w: c.width,
      h: c.height,
      rect: { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) },
      cls: (c.className || "").toString().slice(0, 80),
      parentCls: (parent?.className || "").toString().slice(0, 120),
      parentRect: pr ? { w: Math.round(pr.width), h: Math.round(pr.height) } : null,
    };
  });

  const webgl = (() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) return "none";
      return gl.getParameter(gl.VERSION);
    } catch (e) {
      return "err: " + e.message;
    }
  })();

  return { canvases, webgl };
});

console.log("WebGL:", info.webgl);
console.log("Canvas count:", info.canvases.length);
console.log(JSON.stringify(info.canvases, null, 2));

await browser.close();

import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:5201/";
const width = Number(process.argv[3] || 1440);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.getElementById("intro-splash")?.remove());
await page.waitForTimeout(1200);

const out = await page.evaluate(() => {
  const h = document.querySelector("h1");
  if (!h) return { error: "no h1" };
  const cs = getComputedStyle(h);
  // Count rendered lines via client rects of a range over the text node.
  const range = document.createRange();
  range.selectNodeContents(h);
  const lines = range.getClientRects().length;
  return {
    vw: window.innerWidth,
    text: h.textContent,
    fontFamily: cs.fontFamily,
    fontSize: cs.fontSize,
    fontWeight: cs.fontWeight,
    letterSpacing: cs.letterSpacing,
    textWrap: cs.textWrap || cs.getPropertyValue("text-wrap"),
    colWidth: h.clientWidth,
    renderedLines: lines,
    rectWidths: [...range.getClientRects()].map((r) => Math.round(r.width)),
  };
});

console.log(JSON.stringify(out, null, 2));
await browser.close();

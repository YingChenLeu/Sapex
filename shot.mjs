import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:5201/";
const out = process.argv[3] || "shots/landing";
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);
const selector = process.argv[6];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 2,
});

await page.goto(url, { waitUntil: "networkidle" });
// The intro splash covers the page on first load.
await page.evaluate(() => document.getElementById("intro-splash")?.remove());
await page.evaluate(() => (document.body.style.overflow = "auto"));
await page.waitForTimeout(1200);

// framer-motion whileInView only fires for elements that actually enter the
// viewport, so walk the page before capturing or those sections stay at
// opacity 0 in the screenshot.
await page.evaluate(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 220));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 600));
});
await page.waitForTimeout(1500);

if (selector) {
  const el = await page.$(selector);
  if (!el) throw new Error(`no element for ${selector}`);
  await el.screenshot({ path: `${out}.png` });
  console.log("wrote", `${out}.png`);
} else {
  await page.screenshot({ path: `${out}-viewport.png` });
  await page.screenshot({ path: `${out}-full.png`, fullPage: true });
  console.log("wrote", `${out}-viewport.png`, `${out}-full.png`);
}

await browser.close();

import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:4173", { waitUntil: "networkidle" });
await p.waitForTimeout(5200);
await p.evaluate(() => document.querySelector("#work")?.scrollIntoView());
await p.waitForTimeout(1200);
await p.screenshot({ path: "/tmp/shots/twofont-work.png" });
await b.close(); console.log("ok");

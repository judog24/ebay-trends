import { chromium } from "playwright";

async function openPage(url: string): Promise<string> {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.$('ul.srp-results');
  const html = await page.content();
  //await browser.close();

  return html;
}

export { openPage };
import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox','--disable-dev-shm-usage'] });
const page = await browser.newPage();
await page.goto('http://localhost:5000/invoice', { waitUntil: 'networkidle0', timeout: 15000 });
const results = await new AxePuppeteer(page).analyze();
results.violations.forEach(v => {
  console.log(v.impact, v.id, ':', v.description);
  v.nodes.slice(0,2).forEach(n => console.log('  node:', n.html.slice(0,150)));
});
await browser.close();

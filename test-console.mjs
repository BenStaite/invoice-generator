import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const page = await browser.newPage();

const consoleErrors = [];
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', err => consoleErrors.push('PAGE ERROR: ' + err.message));

await page.goto('http://localhost:5000/invoice', { waitUntil: 'networkidle0' });

// Test: click download with empty fields
const buttons = await page.$$('button');
for (const btn of buttons) {
  const text = await btn.evaluate(el => el.textContent);
  if (text.includes('Download')) { await btn.click(); break; }
}
await new Promise(r => setTimeout(r, 800));

// Fill form minimally
await page.type('#sender-name', 'ACME');
await page.type('#client-name-input', 'Client');
const descs = await page.$$('input[placeholder="Item description"]');
if (descs[0]) await descs[0].type('Service');
await page.evaluate(() => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  const n = document.querySelectorAll('input[type="number"]');
  setter.call(n[0], '1'); n[0].dispatchEvent(new Event('input', { bubbles: true }));
  setter.call(n[1], '100'); n[1].dispatchEvent(new Event('input', { bubbles: true }));
});

await new Promise(r => setTimeout(r, 300));
console.log('Console errors so far:', JSON.stringify(consoleErrors));

// Check unitPrice=0 validation
const errState = await page.evaluate(() => {
  // simulate: what errors show when unitPrice is 0?
  // We can check the validation logic by looking at itemErrors
  const inputs = document.querySelectorAll('input[type="number"]');
  return { qty: inputs[0]?.value, price: inputs[1]?.value };
});
console.log('Current number inputs:', errState);

await browser.close();
console.log('DONE');

import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const page = await browser.newPage();
page.setDefaultTimeout(10000);

await page.goto('http://localhost:5000/invoice', { waitUntil: 'networkidle0' });

// Fill all fields correctly
await page.type('#sender-name', 'ACME Corp');
await page.type('#client-name-input', 'Client X');

const descInputs = await page.$$('input[placeholder="Item description"]');
if (descInputs[0]) await descInputs[0].type('Service');

await page.evaluate(() => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  const numInputs = document.querySelectorAll('input[type="number"]');
  setter.call(numInputs[0], '1');
  numInputs[0].dispatchEvent(new Event('input', { bubbles: true }));
  setter.call(numInputs[1], '100');
  numInputs[1].dispatchEvent(new Event('input', { bubbles: true }));
});

// Click Download
const buttons = await page.$$('button');
for (const btn of buttons) {
  const text = await btn.evaluate(el => el.textContent);
  if (text.includes('Download')) { await btn.click(); break; }
}
await new Promise(r => setTimeout(r, 800));

const errorsValid = await page.evaluate(() => 
  Array.from(document.querySelectorAll('p.text-red-500')).map(e => e.textContent.trim())
);
console.log('Errors with all valid (expect 0):', errorsValid.length, JSON.stringify(errorsValid));

await browser.close();
console.log('DONE');

import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {

  test('An event element is collapsed by default', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('.Event');

    const extra = await page.$('.Event .extra');
    expect(extra).toBeNull();
    browser.close();
  });

  test('User can expand an event to see its details', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
    await page.click('.Event .Event-details-button');

    const extra = await page.$('.Event .extra');
    expect(extra).toBeDefined();
    browser.close();
  });

  test('User can collapse an event to hide its details', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
    await page.click('.Event .Event-details-button');

    const extra = await page.$('.Event .extra');
    expect(extra).toBeNull();
  });
});
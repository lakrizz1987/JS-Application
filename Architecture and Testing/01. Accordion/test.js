const { expect } = require('chai');
const { chromium } = require('playwright-chromium');

describe('Test more button works', function () {
    this.timeout(6000);

    it('Should display content in extra paragraph while button MORE is clicked', async () => {
        const browser = await chromium.launch({ handless: false, slowMo: 500 });
        const page = await browser.newPage();
        await page.goto('http://127.0.0.1:5500/index.html');
        await page.click('#main>.accordion:first-child >> text=More');
        await page.screenshot({ path: `example.png` });
        await page.waitForSelector('#main>.accordion:first-child >> .extra p');
        const visible = await page.isVisible('#main>.accordion:first-child >> .extra p'); 
        expect(visible).to.be.true;
        await browser.close()
    });
   
})

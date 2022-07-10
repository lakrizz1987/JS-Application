const { expect } = require('chai');
const { chromium } = require('playwright-chromium');

describe('Test more/less button works', function () {
    this.timeout(6000);
    before(async () => { browser = await chromium.launch({ handless: false, slowMo: 500 }); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); }); afterEach(async () => { await page.close(); });

    it('Should display content in extra paragraph while button MORE is clicked', async () => {

        await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');
        await page.click('#main>.accordion:first-child >> text=More');
        await page.screenshot({ path: `example.png` });
        await page.waitForSelector('#main>.accordion:first-child >> .extra p');
        const visible = await page.isVisible('#main>.accordion:first-child >> .extra p');
        expect(visible).to.be.true;
    });

    it('Should hide content when LESS btn is clicked', async () => {
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');
        await page.click('#main>.accordion:first-child >> text=More');
        await page.waitForSelector('#main>.accordion:first-child >> .extra p');
        await page.click('#main>.accordion:first-child >> text=Less');
        await page.screenshot({ path: `example1.png` });
        const visible = await page.isVisible('#main>.accordion:first-child >> .extra p');
        expect(visible).to.be.false;
    });

})

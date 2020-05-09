const puppeteer = require('puppeteer');

module.exports = {
    
    createPDF: async function(res, url) {

        console.log('URL: ', url);

      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });

      const buffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          left: "0px",
          top: "0px",
          right: "0px",
          bottom: "0px"
        }
      });
      await browser.close();
      res.end(buffer);
    }
  };
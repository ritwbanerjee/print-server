
module.exports = {

    createDOCX: async function (res, url) {
        console.log("REQUEST URL: ", url);
        try {
            const puppeteer = require('puppeteer');
            const htmlDocx= require('html-docx-js');  
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle0' });
            let bodyHTML = await page.evaluate(() => document.body.outerHTML);
            var docx = htmlDocx.asBlob(
                ['\ufeff', bodyHTML],
                {
                    type: 'application/msword'
                });
            res.setHeader('Content-Type', 'application/msword');
            res.setHeader('Content-Length', docx.length);
            res.send(docx);

            // console.log('converted: ', converted);
            // console.log('Sending document')
            // res.end(converted);
            await browser.close();
        } catch(err) {
            return err
        }
        
    }
};
const express = require('express'),
  morgan = require('morgan'),
  helmet = require('helmet'),
  cors = require('cors'),
  compression = require('compression');

require('dotenv').config();

const app = express();

app.use(compression());
app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());


app.post('/', async (req, res) => {
  console.log('REQUEST URL: ', req.body.url);
  try {
    if (req.body.url) {
      const pdf = await printPDF(req.body.url, req.body.name);
      res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
      res.send(pdf);
    } else {
      res.status(500).send();
    }
  } catch(err) {
    res.status(err);
  }
})

async function printPDF(url, name) {
  try {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.emulateMedia('screen');

    const pdfConfig = {
      format: 'A4',
      printBackground: true
  };

    const pdf = await page.pdf(pdfConfig);

    await browser.close();
    return pdf
  } catch (err) {
    return err
  }

}


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
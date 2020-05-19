const express = require('express'),
  morgan = require('morgan'),
  helmet = require('helmet'),
  cors = require('cors'),
  compression = require('compression'),
  fs = require('fs'),
  path = require('path');
  const https = require('https');

require('dotenv').config();

const app = express();
app.use(compression());
app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());

require('./controller/print-file');

app.post('/', async (req, res) => {
  require('./controller/print-file').createPDF(res, req.body.url)
})

app.post('/word', (req, res) => {
  require('./controller/print-document').createDOCX(res, req.body.url)
});

app.post('/test', (req, res) => {
  const url = req.body.url;
  const times = req.body.times;

  console.log('URL: ', url);
  console.log('times: ', times);

  var resp = [];

  for(var i=0; i<=parseInt(times); i++) {
    https.get(url, (response) => {
      console.log('Success: ', i);
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }

  res.send({
    res: resp
  });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
const express = require('express'),
  morgan = require('morgan'),
  helmet = require('helmet'),
  cors = require('cors'),
  compression = require('compression'),
  fs = require('fs'),
  path = require('path');

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
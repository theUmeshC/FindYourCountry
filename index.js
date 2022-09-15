/* eslint-disable linebreak-style */
const express = require('express');

const path = require('path');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/page2', (req, res) => {
  res.sendFile('page2.html', { root: __dirname });
});
app.get('/src/:subPath', (req, res) => {
  const { subPath } = req.params;
  res.sendFile(`src/${subPath}`, { root: __dirname });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`now listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

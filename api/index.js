const express = require('express');
// const config = require("./config.json");
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const PORT = 8080;
const CLIENT_ID = 7797209;
const CLIENT_SECRET = 'HKtoWtWuIC35ZTOlgwyP';
const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'http://education-bot-creator.ru/'
    : 'http://127.0.0.1:3002/';
// const routes = require("./src/Routes/index");
const cors = require('cors');

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api', routes);
// https://oauth.vk.com/access_token?client_id=7797209&client_secret=HKtoWtWuIC35ZTOlgwyP&redirect_uri=http://education-bot-creator.ru/&code=32aed33e18d2bf7345
app.get('/api/auth', async (req, res) => {
  console.log(process.env.NODE_ENV, process.env.REDIRECT_URI);

  const code = req.query.code;
  await https
    .get(
      `https://oauth.vk.com/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      (responseVk) => {
        responseVk.on('data', (d) => {
          console.log(JSON.parse(d));
          const hasError = JSON.parse(d);
          if (hasError.error) {
            res.sendStatus(404);
            return;
          }
          res.status(200).send(JSON.parse(d));
        });
      }
    )
    .on('error', (e) => {});
  // res.send(`Hello world ${code}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер работает на порту ${process.env.PORT}`);
});

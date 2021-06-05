const express = require('express');
// const config = require("./config.json");
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const PORT = 8081;
const V = '5.130';
const CLIENT_ID = 7797209;
const CLIENT_SECRET = 'HKtoWtWuIC35ZTOlgwyP';
const REDIRECT_URI = 'http://127.0.0.1';
// const routes = require("./src/Routes/index");
const cors = require('cors');
require('dotenv').config();
let token = null;
let user_id = null;

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
/**
 * НЕОБХОДИМО ИСПОЛЬЗОВАТЬ АВТОРИЗАЦИЮ Implicit Flow
 */
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api', routes);
// https://oauth.vk.com/access_token?client_id=7797209&client_secret=HKtoWtWuIC35ZTOlgwyP&redirect_uri=http://education-bot-creator.ru/&code=32aed33e18d2bf7345
app.get('/api/auth', async (req, res) => {
  const code = req.query.code;
  await https
    .get(
      `https://oauth.vk.com/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      (responseVk) => {
        responseVk.on('data', (d) => {
          const hasError = JSON.parse(d);
          if (hasError.error) {
            res.status(404).send(hasError);
            return;
          }
          token = JSON.parse(d).access_token;
          user_id = JSON.parse(d).user_id;
          // console.log(token, user_id);
          res.status(200).send(JSON.parse(d));
        });
      }
    )
    .on('error', (e) => {});
});

/**
 * Получение инфы о пользователе
 */
app.get('/api/user-info', async (req, res) => {
  await https.get(
    `https://api.vk.com/method/users.get?user_ids=${user_id}&fields=bdate&access_token=${token}&v=${V}`,
    (resVk) => {
      resVk.on('data', (d) => {
        const data = JSON.parse(d);
        if (data.error) {
          res.status(404).send(data.error);
          return;
        }
        res.status(200).send(data.response[0]);
      });
    }
  );
});

app.get('/api/user-groups', async (req, res) => {
  await https.get(
    `https://api.vk.com/method/groups.get?user_ids=${user_id}&extended=1&filter=admin&access_token=${token}&v=5.131`,
    (resVk) => {
      let rawData = '';
      resVk.on('data', (chunk) => {
        rawData += chunk;
      });
      resVk.on('end', () => {
        const data = JSON.parse(rawData);
        if (data.error) {
          res.status(404).send(data.error);
          return;
        }
        res.status(200).send(data.response.items);
      });
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер работает на порту ${process.env.PORT}`);
});

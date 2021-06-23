const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const PORT = 8081;
const V = '5.130';
const CLIENT_ID = 7876201;
const CLIENT_SECRET = 'dVAg9B3s32kLzojJc49B';
const REDIRECT_URI = 'http://127.0.0.1';
const REDIRECT_URI_GROUP = 'http://127.0.0.1/office';
const secret_key_group = 'ZWR1Y2F0aW9uLWJvdC1jcmVhdG9y';

// const routes = require("./src/Routes/index");
const mongoClient = new MongoClient('mongodb://localhost:27017', {
  useUnifiedTopology: true,
});
let dbClient;
const cors = require('cors');
require('dotenv').config();
let token = null;
let token_group = null;
let user_id = null;

mongoClient.connect(function (err, client) {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.botsCollection = client.db('educationBot').collection('bots');

  app.listen(process.env.PORT, () => {
    console.log(`Сервер работает на порту ${process.env.PORT}`);
  });
});

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

/**
 * Авторизация группы
 * С использованием Callback API
 */
app.get('/api/auth-group', async (req, res) => {
  const code = req.query.code;
  let group_id = null;
  let code_group = null;
  https
    .get(
      `https://oauth.vk.com/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI_GROUP}&code=${code}`,
      (responseVk) => {
        responseVk.on('data', (d) => {
          const hasError = JSON.parse(d);
          if (hasError.error) {
            res.status(404).send(hasError);
            return;
          }
          token_group = JSON.parse(d).groups[0].access_token;
          group_id = JSON.parse(d).groups[0].group_id;
          // Добавим сервер в группу
          // TODO: Fix it. Убрать тунельный домен
          https.get(
            `https://api.vk.com/method/groups.addCallbackServer?group_id=${group_id}&url=http://57f47bb4d7e5.ngrok.io/api/office/${group_id}&secret_key=${secret_key_group}&title=EducationBot&access_token=${token_group}&v=5.131`,
            (responseVk) => {
              responseVk.on('data', (d) => {
                const data = JSON.parse(d);
                if (secret_key_group === null) {
                  console.log(secret_key_group, 'null');
                  return;
                }
                if (data.error) {
                  console.log('error addCallbackServer', data.error);
                  res.status(403).send(data.error);
                  return;
                }
                const server_id = data.response.server_id;
                // Установим настройки для сервера
                https.get(
                  `https://api.vk.com/method/groups.setCallbackSettings?group_id=${group_id}&server_id=${server_id}&access_token=${token_group}&v=5.131&message_new=1&group_join=1`,
                  (resVk) => {
                    resVk.on('data', (d) => {
                      const data = JSON.parse(d);
                      res.status(200).send({
                        status: 'success',
                        group_id,
                      });
                    });
                  }
                );
              });
            }
          );
        });
      }
    )
    .on('error', (e) => {});
});

// Подтвердим адрес добавленного сервера
app.post('/api/office/:id', async (req, res) => {
  let confirmationCode = null;
  req.on('data', (d) => {
    const body = JSON.parse(d);
    console.log(body);
    // Получим code для добавления сервера в группу
    if (body.type === 'confirmation') {
      https.get(
        `https://api.vk.com/method/groups.getCallbackConfirmationCode?group_id=${req.params.id}&access_token=${token_group}&v=5.131`,
        (responseVk) => {
          responseVk.on('data', (d) => {
            const data = JSON.parse(d);
            if (data.error) {
              console.log('error getCallbackConfirmationCode', data.error);
              res.status(403).send(data.error);
              return;
            }
            confirmationCode = data.response.code;
            res.send(confirmationCode);
          });
        }
      );
    }
  });
});

process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});

const express = require('express');
const app = express();
const https = require('https');
const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;
const PORT = 8081;
const V = '5.131';
const CLIENT_ID = 7876201;
const CLIENT_SECRET = 'dVAg9B3s32kLzojJc49B';
const REDIRECT_URI = 'http://127.0.0.1';
const REDIRECT_URI_GROUP = 'http://127.0.0.1/office';
const secret_key_group = 'ZWR1Y2F0aW9uLWJvdC1jcmVhdG9y';
const TEST_URL = 'http://2e62-37-131-203-172.ngrok.io';
const SERVER_NAME = 'EducationBot';

// TODO: Бэк для диалогов. Добавление диалогов, удаление и тд done
// TODO: Хранить secret_key в БД ???? access_token для группы походу тоже надо хранить в базе
// Что еще нужно реализовать:
// 1. Рассылка всем пользователям группы или пользователям, которые состоят в какой-то отдельной внутренней группе
// 2. Возможность добавлять пользователей в группы
// 3. Добавить настройку по умолчанию с возможностью включения и выключения, которое позволит добавить пользователя в группу. Например, пользователь должен отправить сообщение
// 'группа ИСИТ-1701z'
// 4. Добавить функционал просмотра статистики
// 5. Добавить функционал ввода команд, которые админ написал в боте. (/help как пример)
// 6. Вывести список подписчиков

// const routes = require("./src/Routes/index");
const mongoClient = new MongoClient('mongodb://localhost:27017', {
  useUnifiedTopology: true,
});
let dbClient;
const cors = require('cors');
const { ObjectId } = require('bson');
require('dotenv').config();
let token = null;
let token_group = null;
let user_id = null;

mongoClient.connect(function (err, client) {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.botsCollection = client.db('educationBot').collection('bots');
  app.locals.keywordsCollection = client
    .db('educationBot')
    .collection('keywords');
  app.locals.dialogsCollection = client
    .db('educationBot')
    .collection('dialogs');

  app.locals.dialogsStarting = client
    .db('educationBot')
    .collection('dialogsStarting');

  app.locals.messagesHistory = client
    .db('educationBot')
    .collection('messagesHistory');

  app.locals.answersHistory = client
    .db('educationBot')
    .collection('answersHistory');

  app.locals.dialogsHistory = client
    .db('educationBot')
    .collection('dialogsHistory');

  app.locals.innerGroups = client.db('educationBot').collection('innerGroups');

  app.locals.usersInGroups = client
    .db('educationBot')
    .collection('usersInGroups');

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

function messageSend(id, message, keyboard) {
  const randomId = Math.floor(Math.random() * 10000);
  // axios
  //   .post(
  //     `https://api.vk.com/method/messages.send?access_token=${token_group}&v=5.111&random_id=${randomId}&user_ids=${id}&message=${message}`,
  //   )
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // const payload = {
  //   dialog: true,
  // };

  const body = new URLSearchParams({
    // payload: JSON.stringify(payload),
    random_id: randomId,
    user_id: id,
    // peer_id: id,
    message,
    // v: '5.131',
  });

  if (keyboard) {
    body.append('keyboard', keyboard);
  }

  fetch(
    `https://api.vk.com/method/messages.send?access_token=${token_group}&v=${V}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }
  )
    .then((res) => res.json())
    .then((d) => {
      console.log(d);
    })
    .then(console.log);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function prepareKeyboard(question) {
  const buttons = question.answers.map((el) => ({
    action: {
      type: 'text',
      // payload: `point:${el.point}/answerNum:${el.answerNum}/answer:${el.answer}`,
      payload: JSON.stringify({
        point: el.point,
        answerNum: el.answerNum,
        answer: el.answer,
        questionNum: question.questionNum,
      }),
      label: el.answer,
    },
    color: 'primary',
  }));
  const keyboard = {
    buttons: [buttons],
    inline: true,
  };

  return JSON.stringify(keyboard);
}

function addMessageHistory(object) {
  app.locals.messagesHistory.insertOne(object);
}

function addDialogHistory(object) {
  app.locals.dialogsHistory.insertOne(object);
}

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
          // Проверим есть ли сервер в группе уже
          https.get(
            `https://api.vk.com/method/groups.getCallbackServers?group_id=${group_id}&access_token=${token_group}&v=5.131`,
            (responseVk) => {
              responseVk.on('data', (d) => {
                const data = JSON.parse(d);
                const isFindServer = data.response.items.find(
                  (el) => el.title === SERVER_NAME
                );
                console.log(isFindServer);
                if (isFindServer) {
                  res.status(200).send({
                    status: 'success',
                    group_id,
                  });
                  return;
                }
                // Добавим сервер в группу
                // TODO: Fix it. Убрать тунельный домен
                https.get(
                  `https://api.vk.com/method/groups.addCallbackServer?group_id=${group_id}&url=${TEST_URL}/api/office/${group_id}&secret_key=${secret_key_group}&title=${SERVER_NAME}&access_token=${token_group}&v=5.131`,
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
                        `https://api.vk.com/method/groups.setCallbackSettings?group_id=${group_id}&server_id=${server_id}&access_token=${token_group}&v=5.131&message_new=1&group_join=1&api_version=${V}`,
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
          );
        });
      }
    )
    .on('error', (e) => {});
});

// Подтвердим адрес добавленного сервера
app.post('/api/office/:id', async (req, res) => {
  let confirmationCode = null;
  console.log('token_group', token_group);
  req.on('data', async (d) => {
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
    } else if (body.type === 'message_new') {
      /**
       * Смотрим, есть ли открытый диалог
       */

      const currentDialog = await app.locals.dialogsStarting.findOne({
        userId: body.object.message.peer_id,
      });
      // console.log('currentDialog', currentDialog);
      if (currentDialog) {
        const payload = JSON.parse(body.object.message.payload);
        app.locals.answersHistory.insertOne({
          userId: body.object.message.from_id,
          dialogId: ObjectId(currentDialog.dialogId),
          dialogStartingId: ObjectId(currentDialog._id),
          ...payload,
        });
        // Ищем следующие вопросы в диалоге
        const questions = await app.locals.dialogsCollection.findOne({
          _id: ObjectId(currentDialog.dialogId),
        });
        // console.log('payload', payload);
        const nextQuestion = questions.questions.find(
          (el) => el.questionNum === payload.questionNum + 1
        );
        // console.log('nextQuestion', nextQuestion);
        if (nextQuestion) {
          const keyboard = prepareKeyboard(nextQuestion);
          messageSend(
            body.object.message.from_id,
            nextQuestion.question,
            keyboard
          );
          addMessageHistory({
            user_id: body.object.message.from_id,
            dialogId: Object(currentDialog.dialogId),
            question: nextQuestion.question,
            date: new Date(),
          });
        } else {
          app.locals.dialogsStarting.deleteOne({
            _id: currentDialog._id,
          });
        }
        res.send('ok');
        return;
      }
      /**
       * Сначала ищем совпадения по ключевым словам
       */

      req.app.locals.keywordsCollection.findOne(
        {
          group_id: body.group_id.toString(),
          keyword: body.object.message.text.toLowerCase(),
        },
        async (err, data) => {
          try {
            // #key:1
            if (err) {
              console.log('#key:1', err);
              return;
            }
            console.log(data);
            messageSend(body.object.message.from_id, data.text);
            // #dlg:1
            if (data.dialogId) {
              req.app.locals.dialogsCollection.findOne(
                {
                  _id: ObjectId(data.dialogId),
                },
                async (err, innerData) => {
                  if (err) {
                    console.log('#dlg:1', err);
                    return;
                  }
                  // Если диалог одноразовый
                  if (innerData.isSingle) {
                    const isOldDialog = await app.locals.dialogsHistory.findOne(
                      {
                        userId: body.object.message.from_id,
                        dialogId: ObjectId(data.dialogId),
                      }
                    );
                    if (isOldDialog) {
                      return;
                    }
                  }

                  const insertObject = {
                    userId: body.object.message.from_id,
                    dialogId: ObjectId(data.dialogId),
                  };

                  req.app.locals.dialogsStarting.insertOne(insertObject);
                  addDialogHistory(insertObject);
                  // Если есть первое сообщение в диалоге, то отправим
                  if (innerData.questions[0]) {
                    // сформировать сообщение и отправить пользователю
                    const keyboard = prepareKeyboard(innerData.questions[0]);
                    await sleep(2000);
                    messageSend(
                      body.object.message.from_id,
                      innerData.questions[0].question,
                      keyboard
                    );
                    addMessageHistory({
                      user_id: body.object.message.from_id,
                      dialogId: Object(data.dialogId),
                      question: innerData.questions[0].question,
                      date: new Date(),
                    });
                  }
                }
              );
            }
            res.send('ok');
            return;
          } catch (error) {
            console.log(error);
            res.send('ok');
          }
        }
      );
    }
  });
});

// Ключевые слова ==========
app.get('/api/office/:id/keyword', async (req, res) => {
  const { id } = req.params;
  req.app.locals.keywordsCollection
    .find({
      group_id: id.toString(),
    })
    .toArray((err, items) => {
      if (err) {
        return res.status(400).send();
      }
      if (items.length === 0) {
        return res.status(204).send();
      }
      return res.status(200).send(items);
    });
});

app.put('/api/office/:id/keyword', async (req, res) => {
  await req.on('data', (d) => {
    const body = JSON.parse(d);
    const insertResult = {
      group_id: req.params.id,
      ...body.data,
      keyword: body.data.keyword.toLowerCase(),
      dialogId: body.data.dialogId ? ObjectId(body.data.dialogId) : null,
    };
    req.app.locals.keywordsCollection.insertOne(insertResult, (err, result) => {
      if (err) {
        return res.status(400).send();
      }
      return res.status(201).send();
    });
  });
});

app.delete('/api/office/:id/keyword', async (req, res) => {
  await req.on('data', (d) => {
    const { id } = JSON.parse(d);
    try {
      req.app.locals.keywordsCollection.deleteOne({
        group_id: req.params.id.toString(),
        _id: ObjectId(id),
      });
      return res.status(200).send();
    } catch {
      return res.status(400).send();
    }
  });
});

// ========================

// Диалоги =================
app.get('/api/office/:id/dialog', async (req, res) => {
  const { id } = req.params;
  req.app.locals.dialogsCollection
    .find({
      group_id: id.toString(),
    })
    .toArray((err, items) => {
      if (err) {
        return res.status(400).send();
      }
      if (items.length === 0) {
        return res.status(204).send();
      }
      return res.status(200).send(items);
    });
});

app.put('/api/office/:id/dialog', async (req, res) => {
  await req.on('data', (d) => {
    const body = JSON.parse(d);
    const insertResult = {
      group_id: req.params.id,
      ...body,
    };

    req.app.locals.dialogsCollection.insertOne(insertResult, (err, result) => {
      if (err) {
        return res.status(400).send();
      }
      return res.status(201).send();
    });
  });
});

app.delete('/api/office/:id/dialog', async (req, res) => {
  await req.on('data', (d) => {
    const { id } = JSON.parse(d);
    try {
      req.app.locals.dialogsCollection.deleteOne({
        group_id: req.params.id.toString(),
        _id: ObjectId(id),
      });
      return res.status(200).send();
    } catch {
      return res.status(400).send();
    }
  });
});

// ========================

// Подписчики =================
app.get('/api/office/:id/subscribes', (req, res) => {
  const { id } = req.params;
  https.get(
    `https://api.vk.com/method/groups.getMembers?group_id=${id}&access_token=${token_group}&v=5.131&fields=photo_50`,
    (resVk) => {
      let rawData = '';
      resVk
        .on('data', (chunk) => {
          rawData += chunk;
        })
        .on('end', () => {
          const data = JSON.parse(rawData).response;
          const newData = data.items.map(async (el) => {
            const userInGroup = await app.locals.usersInGroups.findOne({
              user_id: el.id,
              group_id: id,
            });
            if (userInGroup === null) {
              return {
                ...el,
                inner_group: null,
              };
            }
            const innerGroup = await app.locals.innerGroups.findOne({
              _id: ObjectId(userInGroup.inner_group_id),
            });
            return {
              ...el,
              inner_group: innerGroup._id,
            };
          });
          Promise.all(newData).then((d) => {
            res.status(200).send({ count: data.count, items: d });
          });
        });
    }
  );
});

// ========================

// Внутренние группы ==================

app.get('/api/office/:id/inner-groups', async (req, res) => {
  const { id } = req.params;
  const data = await req.app.locals.innerGroups
    .find({
      group_id: id.toString(),
    })
    .toArray();

  res.status(200).send(data);
});

app.put('/api/office/:id/inner-groups', async (req, res) => {
  await req.on('data', (d) => {
    const body = JSON.parse(d);
    const insertResult = {
      group_id: req.params.id,
      ...body,
    };

    app.locals.innerGroups.insertOne(insertResult, (err, result) => {
      if (err) {
        return res.status(400).send();
      }
      return res.status(201).send();
    });
  });
});

app.delete('/api/office/:id/inner-groups', async (req, res) => {
  await req.on('data', (d) => {
    const { id } = JSON.parse(d);
    try {
      app.locals.innerGroups.deleteOne({
        group_id: req.params.id.toString(),
        _id: ObjectId(id),
      });
      return res.status(200).send();
    } catch {
      return res.status(400).send();
    }
  });
});

app.post('/api/office/:id/change-inner-group', async (req, res) => {
  await req.on('data', (d) => {
    const { id } = req.params;
    const { inner_group_id, user_id } = JSON.parse(d);
    try {
      app.locals.usersInGroups.insertOne({
        group_id: id,
        inner_group_id: ObjectId(inner_group_id),
        user_id: user_id,
      });
      return res.status(201).send();
    } catch {
      return res.status(400).send();
    }
  });
});

// ====================================

process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});

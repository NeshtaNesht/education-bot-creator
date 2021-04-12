const express = require('express');
// const config = require("./config.json");
const app = express();
const bodyParser = require('body-parser');
// const routes = require("./src/Routes/index");
// const cors = require('cors');

// app.use(cors());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'https://localhost:10888');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api', routes);

app.get('/api/auth', (req, res) => {
  const test = JSON.stringify(req.params);
  res.send(`Hello world ${test}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер работает на порту ${process.env.PORT}`);
});

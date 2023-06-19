const express = require('express');
// const helmet = require('helmet');
const cors = require('cors');
const db = require('./src/configs/db.config.js');
const apiRoute = require('./src/routes/router.js');
const {PORT} = require('./src/constants/index.js');

db.connect();

const app = express();

// app.use(helmet());
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', apiRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
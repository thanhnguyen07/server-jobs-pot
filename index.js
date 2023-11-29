const express = require('express');
const cors = require('cors');
const db = require('./src/configs/db.config.js');
const apiRoute = require('./src/routes/router.js');
const {PORT} = require('./src/constants/index.js');
const admin = require('firebase-admin');
const {
  SERVICE_ACCOUNT,
  STORAGE_BUCKET,
  SERVICE_ACCOUNT_DEV,
  STORAGE_BUCKET_DEV,
} = require('./src/constants/index.js');

db.connect().then(async () => {
  admin.initializeApp({
    credential: admin.credential.cert(
      process.env.NODE_ENV === 'development'
        ? SERVICE_ACCOUNT_DEV
        : SERVICE_ACCOUNT,
    ),
    storageBucket:
      process.env.NODE_ENV === 'development'
        ? STORAGE_BUCKET_DEV
        : STORAGE_BUCKET,
  });

  const app = express();

  app.use(cors());

  app.use(express.urlencoded({extended: true}));

  app.use(express.json());

  app.use('/', apiRoute);

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

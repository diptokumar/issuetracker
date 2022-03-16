const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const fs = require('fs');
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// dotenv.config({ path: './config.env' });
const app = require('./app');


const DB = process.env.DB_URI;

// console.log(DB);

mongoose
  .connect(DB, {
    ssl: true,
    sslValidate: true,
    sslCA: fs.readFileSync('./staging-ca-certificate.crt'),
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const PASS = encodeURIComponent(process.env.DATABASE_PASSWORD); //  + 'x';
const DB = process.env.DATABASE.replace('<PASSWORD>', PASS);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log('DB connection failed');
  });

const app = require('./app');

const port = process.env.PORT;
const host = process.env.HOST;
const server = app.listen(port, host, () => {
  console.log(`App running on ${host}:${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

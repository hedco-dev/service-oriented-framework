import express from 'express';
import chalk from 'chalk';
import figlet from 'figlet';
import http from 'http';
import bootstrap from './bootstrap';
import { close } from './utils/db';

const app = express();
const server = http.createServer(app);
global.magic = global.magic || {};
magic.rootPath = __dirname;

const onExitHandler = async () => {
  try {
    server.close();
    process.exit();
    await close();
  } catch (err) {
    console.log(err);
  }
};

export default async () => {
  await bootstrap(app);

  const connect = () => {
    server.listen(magic.config.http.port, () => {
      console.log(
        chalk.red(
          figlet.textSync('magic', {
            horizontalLayout: 'full',
            font: 'standard'
          })
        )
      );
      magic.logger.info(chalk.white(`Environment: ${magic.config.environment.env}`));
      magic.logger.info(chalk.white(`Start Date:  ${new Date()}`));
      magic.logger.warning(`Framework Version:  ${magic.config.environment.version}`);
      magic.logger.success(chalk.white(`Server has been started on ${magic.config.http.port}`));

      app.on('error', onExitHandler.bind(null, { error: true }));
      process.on('exit', onExitHandler.bind(null, { exit: true }));
      process.on('SIGINT', onExitHandler.bind(null, { SIGINT: true }));
      process.on('SIGTERM', onExitHandler.bind(null, { SIGTERM: true }));
      //process.on('uncaughtException', onExitHandler.bind(null, { uncaughtException: true }));
      //process.on('SIGKILL', onExitHandler.bind(null, { SIGKILL: true }));
    });
  };

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(() => {
        server.close();
        connect();
      }, 5000);
    }
  });
  connect();
};

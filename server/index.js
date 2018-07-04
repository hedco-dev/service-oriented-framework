import express from 'express';
import chalk from 'chalk';
import figlet from 'figlet';
import middlewares from './middlewares';
import apis from './api';
import bootstrap from './bootstrap';

const app = express();
global.magic = global.magic || {};
magic.rootPath = __dirname;

export default (async () => {
  await bootstrap();
  middlewares(app);
  apis(app);
  app.listen(magic.config.http.port, () => {
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
  });
});
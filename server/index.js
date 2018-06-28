const express = require("express");
const app = express();
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

global.rootPath = __dirname;
require('./bootstrap')
  .then(() => {
    app.listen(global.config.http.port, () => {
      logger.log(
        chalk.red(
          figlet.textSync(' magic', {
            horizontalLayout: 'full',
            font: 'standard'
          })
        )
      );
      logger.info(chalk.white(`Environment: ${config.environment.env}`));
      logger.info(chalk.white(`Start Date:  ${new Date()}`));
      logger.success(chalk.white(`Server has been started on ${config.http.port}`));
    });
  }).catch(err => {
    logger.error(err);
  });

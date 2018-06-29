const express = require("express");
const app = express();
const chalk = require('chalk');
const figlet = require('figlet');
const middlewares = require('./middlewares');
//const clear = require('clear');

global.rootPath = __dirname;
require('./bootstrap')
  .then(() => {
    middlewares(app);
    app.listen(global.config.http.port, () => {
      console.log(
        chalk.red(
          figlet.textSync(' magic', {
            horizontalLayout: 'full',
            font: 'standard'
          })
        )
      );
      logger.info(chalk.white(`Environment: ${config.environment.env}`));
      logger.info(chalk.white(`Start Date:  ${new Date()}`));
      logger.warning(`Framework Version:  ${config.environment.version}`);
      logger.success(chalk.white(`Server has been started on ${config.http.port}`));
    });
  }).catch(err => {
    console.log(err);
  });
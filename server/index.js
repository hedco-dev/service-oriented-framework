const express = require("express");
const app = express();
const chalk = require('chalk');
const figlet = require('figlet');
const middlewares = require('./middlewares');
const apis = require('./api');
global.magic = global.magic || {};
global.magic.rootPath = __dirname;
require('./bootstrap')
.then(() => {
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
  }).catch(err => {
    console.log(err);
  });
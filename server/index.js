const express = require("express");
const app = express();
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

global.rootPath = __dirname;
require('./bootstrap')
  .then(() => {
    app.listen(global.config.http.port, () => {
      clear();
      logger.log(
        chalk.red(
          figlet.textSync('MAGIC', {
            horizontalLayout: 'full',
            font: 'poison'
          })
        )
      );
      logger.log(chalk.red(`Server has been started on ${global.config.http.port}`));
    });
  }).catch(err => {
    console.log(err);
  });
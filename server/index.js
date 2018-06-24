const express = require("express");
const app = express();

global.rootPath = __dirname;
require('./bootstrap')
  .then(() => {
    app.listen(global.config.http.port, () => {
      console.log(`Server has been started on ${global.config.http.port}`);
    });
  }).catch(err => {
    console.log(err);
  });
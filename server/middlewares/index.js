import morgan from 'morgan';
import { urlencoded, json } from 'body-parser';
import express from 'express';
import path from 'path';
// setup global middleware here
export default app => {
  app.use((req, res, next) => {
    res.create = async action => {
      try {
        await action();
      } catch (error) {
        const err = magic.config.environment.env === magic.config.environment.envs.production ?
          'something went wrong' : error;
        res.status(500).send(err);
      }
    };
    next();
  });
  app.use(express.static('www'));
  app.use(morgan('dev'));
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..'));
  app.get('/', (req, res) => {
    res.render('pages/index.ejs');
  });
};

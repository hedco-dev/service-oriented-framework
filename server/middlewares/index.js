import morgan from 'morgan';
import { urlencoded, json } from 'body-parser';
import express from 'express';
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
};

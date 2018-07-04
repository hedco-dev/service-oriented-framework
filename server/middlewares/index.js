import morgan from 'morgan';
import { urlencoded, json } from 'body-parser';
import express from 'express';
// setup global middleware here
export default (app) => {
  app.use(express.static('www'));
  app.use(morgan('dev'));
  app.use(urlencoded({ extended: true }));
  app.use(json());
};
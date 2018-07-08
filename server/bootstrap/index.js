import utils from './utils';
import config from './config';
import logger from './logger';
import db from './db';
import apis from '../api';
import middlewares from '../middlewares';

export default async (app) => {
    await utils();
    await config();
    await logger();
    middlewares(app);
    await apis(app);
    await db();
};

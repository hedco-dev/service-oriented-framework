import utils from './utils';
import config from './config';
import logger from './logger';
import db from './db';

export default (async () => {
    await utils();
    await config();
    await logger();
    await db();
});

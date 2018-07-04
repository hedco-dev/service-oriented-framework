import utils from './utils';
import config from './config';
import logger from './logger';
export default (async () => {
    await utils();
    await config();
    await logger();
});
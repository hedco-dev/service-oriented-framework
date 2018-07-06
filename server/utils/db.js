import { MongoClient } from 'mongodb';

let DB;

exports.connect = async (url, options) => {
    if (DB) return DB;

    try {
        DB = await MongoClient.connect(url, options);
        magic.logger.log('The Mongodb connection has been connected.', magic.logger.types.success);
        DB.on('close', () => magic.logger.log('The Mongodb connection has been closed.', magic.logger.types.warning));
        DB.on('error', (err) => magic.logger.log('MongoDB Err', err, magic.logger.types.error));
        DB.on('timeout', () => magic.logger.error('The Mongodb connection timeout.', magic.logger.types.error));
        DB.on('reconnect', () => magic.logger.warning('The Mongodb connection reconnected.', magic.logger.types.warning));
        return DB;
    } catch (e) {
        magic.logger.error(e);
        throw e;
    }
};

exports.get = () => DB;

exports.close = () => new Promise((resolve, reject) => {
        if (DB) {
            DB.close((err) => {
                if (err) return reject(err);
                DB = null;
                return resolve();
            });
        }
    });

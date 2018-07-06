import { MongoClient } from 'mongodb';
var DB;

exports.connect = async (url, options) => {
    if (DB) return resolve(DB);

    try {
        const client = new MongoClient();
       // client.on('serverOpening', () =>  magic.logger.log('db has been connected sunccessfully'));
        DB = await MongoClient.connect(url, options);
        DB.on('timeout', () => {
            console.log('Mongo connection lost')
          })
          
          DB.on('close', () => {
            console.log('Mongo connection closed')
          })
          
          DB.on('reconnect', () => {
            console.log('Mongo reconnected')
          })
          
          DB.on('timeout', () => {
            console.log('Mongo connection lost')
          })
          
          DB.on('close', () => {
            console.log('Mongo connection closed')
          })
          
          DB.on('reconnect', () => {
            console.log('Mongo reconnected')
          })
       // DB.topology.on('close', () => magic.logger.log('db has been closed'));
       // DB.topology.on('reconnect', () => magic.logger.log('db has been connected sunccessfully', magic.logger.types.warning));
        return DB;
    } catch (e) {
        magic.logger.error(e);
        return null;
    }
};

exports.get = () => {
    return DB;
}

exports.close = (done) => {
    return new Promise((resolve, reject) => {
        if (DB) {
            DB.close((err) => {
                if (err) return reject(err);
                DB = null;
                return resolve();
            });
        }
    });
};
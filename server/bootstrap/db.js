import database from '../utils/db';
export default (async () => {
   magic.database = await database.connect(magic.config.database.mongodb.connection, magic.config.database.mongodb.options);
});
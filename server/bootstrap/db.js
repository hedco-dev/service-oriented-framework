import { connect } from '../utils/db';

export default (async () => {
    magic.database = await connect(magic.config.database.mongodb.connection, magic.config.database.mongodb.options);
});

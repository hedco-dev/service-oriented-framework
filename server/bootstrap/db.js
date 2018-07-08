import { plural } from 'pluralize';
import { connect } from '../utils/db';

export default async () => {
    magic.database = await connect(magic.config.database.mongodb.connection, magic.config.database.mongodb.options);

    // binding collection to the models
    const dbName = magic.database.s.options.dbName || 'magic';
    const db = magic.database.db(dbName);
    const collections = await db.listCollections().toArray();
    Object.keys(magic.models)
        .forEach(modelFolder => {
            Object.keys(magic.models[modelFolder])
                .forEach(modelName => {
                    const model = magic.models[modelFolder][modelName];
                    const collectionName = plural(modelName);
                    if (!collections.filter(e => e.name === collectionName).length > 0) {
                        db.createCollection(collectionName, { validator: model.validator });
                    } else {
                        db.command({
                            collMod: collectionName,
                            validator: model.validator
                        });
                    }
                    model.collection = magic.database.db(dbName).collection(collectionName);
                });
        });
};

export const mongodb = {
    connection: 'mongodb://localhost:27017/magic?replicaSet=rs',
    options: {
        useNewUrlParser: true,
        poolSize: 5,
    },
    changeSchemaBehaviour: 'alter' // drop, alter
};

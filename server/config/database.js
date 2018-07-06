module.exports = {
    mongodb: {
        connection: 'mongodb://localhost:27017/magic',
        options: {
            useNewUrlParser: true,
            poolSize: 5,
          //  loggerLevel: 'info'
        }
    }
};

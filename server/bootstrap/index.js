module.exports = require('./utils')
    .then(() => {
        return require('./config');
    })
    .then(() => {
        return require('./logger');
    });

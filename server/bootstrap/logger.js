const loggerService = global.rootPath + '/utils/logger';
module.exports = new Promise((resolve) => {   
        global.logger = require(loggerService);
        resolve();
});
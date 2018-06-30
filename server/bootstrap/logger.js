const loggerService = magic.rootPath + '/utils/logger';
module.exports = new Promise((resolve) => {   
        global.magic.logger = require(loggerService);
        resolve();
});
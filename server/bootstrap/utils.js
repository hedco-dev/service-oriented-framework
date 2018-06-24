const utilsFolder = global.rootPath + '/utils/';
const fs = require("fs");

module.exports = new Promise((resolve, reject) => {
    fs.readdirSync(utilsFolder).forEach((util) => {
        require(utilsFolder + util);
    });
    resolve();
});
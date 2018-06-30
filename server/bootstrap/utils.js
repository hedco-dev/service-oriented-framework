const utilsFolder = magic.rootPath + '/utils/';
const fs = require("fs");

module.exports = new Promise((resolve) => {
    fs.readdirSync(utilsFolder).forEach((util) => {
        require(utilsFolder + util);
    });
    resolve();
});
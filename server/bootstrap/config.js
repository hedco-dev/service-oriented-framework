const configFolder = global.rootPath + '/config/';
const path = require('path');
module.exports = new Promise((resolve, reject) => {
    var config = {};
    global.utils.directory.getFiles({
        dir: configFolder,
        recursive: true,
        pattern: /.*\.js/ig
    }, (err, files) => {
        if (err) reject(err);
        files.forEach(file => {
            const configName = path.basename(file, ".js");
            config = Object.assign(config,{[configName]: require(file)});
        });
        config = Object.assign(config,require(`${configFolder}envs/${config.environment.env}.js`));
        global.config = config;
        resolve(config);
    });
});
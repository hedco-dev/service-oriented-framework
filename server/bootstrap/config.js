const configFolder = global.rootPath + '/config/';
module.exports = new Promise((resolve, reject) => {
    var config = {};
    global.utils.directory.getFiles({
        dir: configFolder,
        recursive: true,
        pattern: /.*\.js/ig
    }, (err, files) => {
        if (err) reject(err);
        files.forEach(file => {
            config = Object.assign(config, require(file));
        });
        global.config = config;
        resolve(config);
    });
});
import path from 'path';

export default (async () => new Promise((resolve, reject) => {
    global.magic = global.magic || {};
    const configFolder = `${magic.rootPath}/config/`;
    let config = {};
    magic.utils.directory.getFiles({
        dir: configFolder,
        recursive: true,
        pattern: /.*\.js/ig
    }, (err, files) => {
        if (err) reject(err);
        files.forEach(file => {
            const configName = path.basename(file, '.js');
            let sConf = require(file);
            if (sConf.default) {
                sConf = sConf.default;
            }
            config = Object.assign(config, { [configName]: sConf });
        });
        config = Object.assign(config, require(`${configFolder}envs/${config.environment.env}.js`));
        global.magic.config = config;
        resolve(config);
    });
}));

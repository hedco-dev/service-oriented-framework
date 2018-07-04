import path from 'path';
export default (async () => {
    return new Promise((resolve, reject) => {
        global.magic = global.magic || {};
        const configFolder = magic.rootPath + '/config/';
        var config = {};
        magic.utils.directory.getFiles({
            dir: configFolder,
            recursive: true,
            pattern: /.*\.js/ig
        }, (err, files) => {
            if (err) reject(err);
            files.forEach(file => {
                const configName = path.basename(file, ".js");
                config = Object.assign(config, { [configName]: require(file) });
            });
            config = Object.assign(config, require(`${configFolder}envs/${config.environment.env}.js`));
            global.magic.config = config;
            resolve(config);
        });
    })
});
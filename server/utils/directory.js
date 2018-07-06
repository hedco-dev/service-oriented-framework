import fs from 'fs';
import path from 'path';

const utils = global.magic.utils || {};
utils.directory = {
    getFiles(options, done) {
        let results = [];
        const dir = options.dir || '';
        if (!dir) {
            return done('directory path is required!');
        }

        const filter = (file) => {
            if (options.pattern) {
                const matched = file.match(options.pattern);
                return matched;
            }
            return true;
        };

        fs.readdir(dir, (err, list) => {
            if (err) return done(err);
            list = list.filter(filter);
            let pending = list.length;
            if (!pending) return done(null, results);

            list.forEach((file) => {
                file = path.resolve(dir, file);
                fs.stat(file, (stateErr, stat) => {
                    if (stat && stat.isDirectory()) {
                        if (options.recursive) {
                            const fileOptions = Object.assign(options, { dir: file });
                            utils.directory.getFiles(fileOptions, (fileErr, res) => {
                                results = results.concat(res);
                                if (!--pending) done(null, results);
                            });
                        } else if (!--pending) done(null, results);
                    } else {
                        results.push(file);
                        if (!--pending) done(null, results);
                    }
                });
            });
        });
    }
};
global.magic.utils = utils;

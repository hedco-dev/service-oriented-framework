import fs from 'fs';
import path from 'path';
var utils = global.magic.utils || {};
utils.directory = {
    getFiles(options, done) {
        var results = [];
        var dir = options.dir || "";
        if (!dir) {
            return done('directory path is required!');
        }

        const filter = (file) => {
            if (options.pattern) {
                var matched = file.match(options.pattern);
                return matched;
            }
            return true;
        };

        fs.readdir(dir, function (err, list) {
            if (err) return done(err);
            list = list.filter(filter);
            var pending = list.length;
            if (!pending) return done(null, results);

            list.forEach(function (file) {
                file = path.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        if (options.recursive) {
                            var fileOptions = Object.assign(options, { dir: file });
                            utils.directory.getFiles(fileOptions, function (err, res) {
                                results = results.concat(res);
                                if (!--pending) done(null, results);
                            });
                        } else {
                            if (!--pending) done(null, results);
                        }
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
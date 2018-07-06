import fs from 'fs';

export default (async () => new Promise((resolve) => {
        const utilsFolder = `${magic.rootPath}/utils/`;
        fs.readdirSync(utilsFolder).forEach((util) => {
            require(utilsFolder + util);
        });
        resolve();
    }));

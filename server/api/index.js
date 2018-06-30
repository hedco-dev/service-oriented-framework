const express = require('express');
const { lstatSync, readdirSync } = require('fs');
const { join, basename } = require('path');
const includeAll = require('include-all');
const isDirectory = source => lstatSync(source).isDirectory();
const findController = (path) => includeAll({
    dirname: path,
    filter: /(.*Controller)\.js$/,
    depth: 1
});
const bindRoutes = (funcName, controller, controllerRouter) => {
    const httpMothods = ["get", "post", "put", "delete"];   
    httpMothods.forEach((httpMethod) => {
        if (funcName.startsWith(httpMethod)) {
            controllerRouter.route(`/${funcName.replace(httpMethod, '')}`)[httpMethod](controller[funcName]);
        }
    });
};
module.exports = (app) => {
    const apiPath = magic.rootPath + '/api';
    readdirSync(apiPath).map(name => join(apiPath, name))
        .forEach((d) => {
            if (isDirectory(d)) {
                const controllers = findController(d);
                const folderName = basename(d);
                Object.keys(controllers).filter((ctrl) => controllers[ctrl]).forEach((ctrl) => {
                    var apiPath = `/${folderName}`;
                    const ctrlName = ctrl.replace("Controller", "");
                    if (ctrlName) {
                        apiPath += `/${ctrlName}`;
                    }
                    const controller = controllers[ctrl];
                    const apis = Object.keys(controller);

                    const controllerRouter = express.Router();
                    apis.forEach((funcName) => bindRoutes(funcName, controller, controllerRouter));
                    app.use(apiPath, controllerRouter);
                });
            }
        });
};
import express from 'express';
import { lstatSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import includeAll from 'include-all';

const isDirectory = source => lstatSync(source).isDirectory();
const findController = (path) => includeAll({
  dirname: path,
  filter: /(.*Controller)\.js$/,
  depth: 1
});
const findModel = (path) => includeAll({
  dirname: path,
  filter: /(.*Model)\.js$/,
  depth: 1
});
const bindRoutes = (funcName, controller, controllerRouter) => {
  const httpMothods = ['get', 'post', 'put', 'delete'];
  httpMothods.forEach((httpMethod) => {
    if (funcName.startsWith(httpMethod)) {
      controllerRouter.route(`/${funcName.replace(httpMethod, '')}`)[httpMethod](controller[funcName]);
    }
  });
};
export default async app => new Promise((resolve) => {
  const apiPath = `${magic.rootPath}/api`;
  magic.models = {};
  readdirSync(apiPath)
    .map(name => join(apiPath, name))
    .filter(d => isDirectory(d))
    .forEach((d) => {
      const controllers = findController(d);
      const folderName = basename(d);
      Object.keys(controllers)
        .filter((ctrl) => controllers[ctrl])
        .forEach((ctrl) => {
          let rootPath = `/${folderName}`;
          const ctrlName = ctrl.replace('Controller', '');
          if (ctrlName) {
            rootPath += `/${ctrlName}`;
          }
          const controller = controllers[ctrl];
          const apis = Object.keys(controller);

          const controllerRouter = express.Router();
          apis.forEach((funcName) => bindRoutes(funcName, controller, controllerRouter));
          app.use(rootPath, controllerRouter);
        });

      // resolve models
      const modelDefaultFolderPath = '/models';
      const modelPath = d + modelDefaultFolderPath;
      if (!existsSync(modelPath)) {
        return;
      }
      const models = findModel(modelPath);
      Object.keys(models)
        .filter((model) => models[model])
        .forEach((model) => {
          const modelName = model.replace('Model', '');
          if (modelName) {
            magic.models[folderName] = magic.models[folderName] || {};
            magic.models[folderName][modelName] = require(`${modelPath}/${model}.js`).default;
          }
        });
    });
  resolve();
});

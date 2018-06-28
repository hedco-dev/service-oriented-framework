// no var needed here, colors will attached colors
// to String.prototype
require('colors');
const _ = require('lodash');
const { Signale } = require('signale');
const options = {
  disabled: false,
  interactive: false,
  stream: process.stdout,
  scope: '',
  types: {
    warning: {
      badge: '⚠️',
      color: 'yellow',
      label: 'WARNING'
    },
    success: {
      badge: '✅',
      color: 'green',
      label: 'SUCCESS'
    },
    error: {
      badge: '❌',
      color: 'red',
      label: 'ERROR'
    },
    info: {
      badge: '🔷',
      color: 'blue',
      label: 'INFO'
    }
  }
};

const customLogger = new Signale(options);
// create a noop (no operation) function for when loggin is disabled
const noop = () => { };
// check if loggin is enabled in the config
// if it is, then use console.log
// if not then noop
var consoleLog = true ? console.log.bind(console) : noop;

const logger = {
  log: function () {
    // arguments is an array like object with all the passed
    // in arguments to this function
    var args = _.toArray(arguments)
      .map(function (arg) {
        if (typeof arg === 'object') {
          // turn the object to a string so we
          // can log all the properties and color it
          const string = JSON.stringify(arg, 2);
          return string.magenta;
        } else {
          // coerce to string to color
          arg += '';
          return arg.magenta;
        }
      });

    // call either console.log or noop here
    // with the console object as the context
    // and the new colored args :)
    consoleLog.apply(console, args);
  },
  success: customLogger.success,
  info: customLogger.info,
  error: customLogger.error,
  warning: customLogger.warning
};
module.exports = logger;
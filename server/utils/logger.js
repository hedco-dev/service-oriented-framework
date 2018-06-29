const { Signale } = require('signale');
const types = {
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
};
const options = {
  disabled: false,
  interactive: false,
  stream: process.stdout,
  scope: '',
  types: types
};

const customLogger = new Signale(options);
const logger = {
  log: (...args) => {
    const logEnabled = true || config && config.consoleLog;
    if (logEnabled) {
      const type = args.length > 1 && args[args.length - 1];
      if (type && types[type]) {
        args.splice(-1, 1);
        customLogger[type](...args);
      } else {
        customLogger.info(...args);
      }
    }
  },
  success: customLogger.success,
  info: customLogger.info,
  error: customLogger.error,
  warning: customLogger.warning,
  types: {
    warning: "warning",
    success: "success",
    error: "error",
    info: "info"
  }
};
module.exports = logger;
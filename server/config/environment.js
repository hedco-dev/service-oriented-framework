const envs = Object.freeze({
    "development": "development",
    "test": "test",
    "production": "production"
});

module.exports = {
    envs: envs,
    env: envs.development,
    version: '0.0.1'
};
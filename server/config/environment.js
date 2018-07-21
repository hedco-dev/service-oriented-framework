const envs = Object.freeze({
    development: 'development',
    test: 'test',
    production: 'production'
});

export default {
    envs,
    env: envs.development,
    version: '0.0.5'
};

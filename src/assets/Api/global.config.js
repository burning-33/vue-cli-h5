
/**
 * api 全局配置
 */

const env = process.env.NODE_ENV;
console.log('env',env)

const apiConfig = {
    development: {
        reqBaseUrl: 'http://www.xyz/'
    },
    production: {
        reqBaseUrl: ''
    },
    test: {
        reqBaseUrl: ''
    }
};

export default {
    apiConfig:
        apiConfig[
        env === 'development'
            ? 'development'
            : env === 'production'
                ? 'production'
                : env === 'test'
                    ? 'test'
                    : env
        ]
};
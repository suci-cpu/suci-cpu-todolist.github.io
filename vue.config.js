const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8081/',//接口的前缀
                ws: true,//代理websocked
                changeOrigin: true,//虚拟的站点需要更管origin
                pathRewrite: {
                    '^/api': ''//重写路径
                }
            }
        },
        port: 8080
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/gd_fe/'
        : '/',
})

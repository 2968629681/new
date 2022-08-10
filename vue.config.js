const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //vue-cli3.0 里面的 vue.config.js做配置
  // devServer: {
  //   proxy: {
  //       '/api': {
  //           target: 'http://trader.niuwx.cn',  // 后台接口域名
  //           ws: true,        //如果要代理 websockets，配置这个参数
  //           secure: false,  // 如果是https接口，需要配置这个参数
  //           changeOrigin: true,  //是否跨域
  //       }
  //   }
  // }

})


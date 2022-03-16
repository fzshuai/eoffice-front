const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 解决跨域问题，vue发送8080端口给node.js，然后转发到8081
let proxyObj = {}

proxyObj['/'] = {
  // websocket
  ws: false,
  // 目标地址
  target: 'http://localhost:8081',
  // 发送请求头host会被设置target
  changeOrigin: true,
  // 不重写请求地址
  pathReWrite: {
    '^/': '/'
  }
}

proxyObj['/ws'] = {
  ws: true,
  target: 'ws://localhost:8081'
};

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}
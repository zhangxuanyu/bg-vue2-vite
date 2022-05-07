import { createVuePlugin } from 'vite-plugin-vue2'

const path = require('path')
console.log(__dirname);

function resolve_path (dir) {
  return path.join(__dirname, './', dir)
}

export default {
  plugins: [createVuePlugin()],
  base: "/",
  resolve:{
    alias:{
      '@':resolve_path('src'),
    }
  },
  server: {
    proxy: {
      // 选项写法
      '/apaas':{
        target: 'https://apaas.gzdata.wodcloud.com/apaas', // 所要代理的目标地址
        rewrite: path => path.replace(/^\/apaas/, ''), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        changeOrigin: true,  // true/false, Default: false - changes the origin of the host header to the target URL
        secure: false,//解决证书缺失问题
      }
    }
  },
  build:{
    outDir:'dist/apaas/ui',
    assetsDir:'static'//相应的容器云设置static设置为public
  }
}

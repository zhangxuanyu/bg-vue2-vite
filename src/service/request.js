/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
 import axios from 'axios';
 import router from '../router';
 import store from '../store/index';
 import ElementUI from 'element-ui';
 
 const tip = msg => {
     console.log(msg);
     ElementUI.Message.error(msg);
 }
 
 /** 
  * 跳转登录页
  * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
  * 登录用 bg-login ，具体链接晚几天加
  */ 
 const toLogin = () => {
     window.location.href = "/iam/login/#/login?redirect=" + router.currentRoute.fullPath
 }
 
 /** 
  * 请求失败后的错误统一处理 
  * @param {Number} status 请求失败的状态码
  */
 const errorHandle = (status, other) => {
     // 状态码判断
     switch (status) {
         case 400: tip('请求错误(400)'); break;
         // 401: 未登录状态，跳转登录页
         case 401:
             // toLogin();
             break;
         // 403 token过期
         // 清除token并跳转登录页
         case 403:
             tip('登录过期，请重新登录');
             localStorage.removeItem('token');
             store.commit('loginSuccess', null);
             setTimeout(() => {
                 toLogin();
             }, 1000);
             break;
         case 404: tip('请求的资源不存在'); break;
         case 408: tip('请求超时(408)'); break;
         case 500: tip(`服务器错误(500),${other}`); break;
         case 501: tip('服务未实现(501)'); break;
         case 502: tip('网络错误(502)'); break;
         case 503: tip('服务不可用(503)'); break;
         case 504: tip('网络超时(504)'); break;
         case 505: tip('HTTP版本不受支持(505)'); break;
         default: tip(`连接出错,${other}`);
     }
 }
 
 // 创建axios实例
 var instance = axios.create({ timeout: 1000 * 30 });
 // 设置post请求头
 instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 /** 
  * 请求拦截器 
  * 每次请求前，如果存在token则在请求头中携带token 
  */
 instance.interceptors.request.use(
     config => {
         // const token = store.state.token;
         // token && (config.headers.Authorization = token);
         return config;
     },
     error => Promise.error(error))
 
 // 响应拦截器
 instance.interceptors.response.use(
     // 请求成功
     res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
     // 请求失败
     error => {
         const { response } = error;
         if (response) {
             // 请求已发出，但是不在2xx的范围 
             errorHandle(response.status, response.data.errMsg);
             return Promise.reject(response);
         }
     });
 
 export default instance;
 
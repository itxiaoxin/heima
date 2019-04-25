import Vue from 'vue';
import App from './App.vue';
// 引入axios，用于发送请求，相当于ajax
import axios from 'axios';
import VueRouter from 'vue-router';

// 是否是生产函数
Vue.config.productionTip = false;

// 引入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入组件
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue'

// 配置路由
const routes=[
  {path:'/',redirect:'/admin'},
  {path:'/login',component:Login},
  {path:'/admin',component:Admin}
]

const router=new VueRouter({routes});
Vue.use(VueRouter);

// 注册element-ui组件
Vue.use(ElementUI);

// 把axios方法绑定到Vue的原型链上，以后每个页面通过this.$axios就可以发送请求，而不需要每次都引入axios
Vue.prototype.$axios=axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

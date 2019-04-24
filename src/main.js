import Vue from 'vue';
import App from './App.vue';
// 引入axios，用于发送请求，相当于ajax
import axios from 'axios';

// 是否是生产函数
Vue.config.productionTip = false;

// 引入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 注册element-ui组件
Vue.use(ElementUI);

// 把axios方法绑定到Vue的原型链上，以后每个页面通过this.$axios就可以发送请求，而不需要每次都引入axios
Vue.prototype.$axios=axios;

new Vue({
  render: h => h(App),
}).$mount('#app')

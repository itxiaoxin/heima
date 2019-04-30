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
import Admin from './pages/Admin.vue';
import GoodsList from './pages/GoodsList.vue';
import GoodsAdd from './pages/GoodsAdd.vue';
import GoodsEdit from './pages/GoodsEdit.vue';
import CategoryList from './pages/CategoryList.vue';

// 配置路由
const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/login', component: Login ,meta:'登录'},
  {
    path: '/admin', component: Admin, meta:'管理后台',children: [
      { path: 'goods-list', component: GoodsList , meta:'商品管理'},
      {path:'goods-add',component:GoodsAdd,meta:'添加商品'},
      {path:'goods-edit/:id',component:GoodsEdit,meta:'编辑商品'},   // :id 表示动态参数，这里是为了传id
      {path:'category-list',component:CategoryList,meta:'栏目管理'}
    ]
  }
]

// 创建路由实例
const router = new VueRouter({ routes });

// 注册组件-----一般从外部引入的组件都要注册
Vue.use(VueRouter);
Vue.use(ElementUI); 

// 拦截路由的请求，先判断用户是否登录
// beforeEach中的函数在每个页面组件加载之前执行 
//to 指要去的路由对象
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  // 根据本地存储判断是否登录，如果没有登录，就跳转到登录页
  if (!localStorage.getItem('userName')) {
    next('/login')
  } else {
    next()
  }
})


// 把axios方法绑定到Vue的原型链上，以后每个页面通过this.$axios就可以发送请求，而不需要每次都引入axios
Vue.prototype.$axios = axios;
// 设置axios默认基本路径，每次axios请求都会加上这串路径
axios.defaults.baseURL = 'http://localhost:8899';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

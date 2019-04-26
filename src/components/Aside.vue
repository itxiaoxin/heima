<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#00a4ff"
  >
    <el-submenu :index="`${index+1}`" v-for="(item,index) in menu">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </template>

      <el-menu-item :index="`${index+1}-${subIndex+1}`" 
      v-for="(subItem,subIndex) in item.children">
      <router-link to="">{{subItem.name}}</router-link>
      </el-menu-item>
    </el-submenu>
    
  </el-menu>
</template>


<script>
export default {
    data(){
        return {
            menu:[
                {
                    icon:'el-icon-tickets',
                    name:'购物商城',
                    children:[
                        {name: "商品管理", src: "/admin/goods-list"},
                        {name: "栏目管理", src: "/admin/category-list"}
                    ]
                },
                {
                    icon:'el-icon-service',
                    name:'会员管理',
                    children:[
                        {name: "会员列表", src: "/admin/account-list"},
                    ]
                },
                {
                    icon:'el-icon-tickets',
                    name:'商城订单',
                    children:[
                        {name: "订单管理", src: "/admin/order-list"},
                    ]
                }
            ]
        }
    }
};
</script>

<style>
.el-menu {
    border-right:none;
}
.router-link-active {
    text-decoration: none;
    color:inherit;
}
</style>
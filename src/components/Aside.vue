<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#00a4ff"
    :collapse="collapse"
  >
    <el-submenu :index="`${index+1}`" v-for="(item,index) in menu" :key="index">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </template>

      <el-menu-item :index="`${index+1}-${subIndex+1}`" 
      v-for="(subItem,subIndex) in item.children"
      :key="subIndex">
      <router-link :to="subItem.src">{{subItem.name}}</router-link>
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
    },
    props:{
        collapse:{
            // 属性的类型
            type:Boolean,
            // 默认值
            value:false
        }
    }
};
</script>

<style>
.el-menu {
    border-right:none;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  a {
    text-decoration: none;
    color:inherit;
}
</style>
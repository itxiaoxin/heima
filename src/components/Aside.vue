<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#00a4ff"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>购物商城</span>
      </template>

      <el-menu-item index="1-1">商品管理</el-menu-item>
      <el-menu-item index="1-2">栏目管理</el-menu-item>
    </el-submenu>
    
  </el-menu>
</template>


<script>
export default {};
</script>

<style>
.el-menu {
    border-right:none;
}
</style>
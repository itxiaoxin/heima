<template>
<div class="pageContainer">
  <el-container>
    <el-aside width="200px">
      <!-- 放置侧边栏组件 -->
      <Aside></Aside>
    </el-aside>
    
    <el-container>
      <el-header>
        <!-- 放置头部组件 -->
        <Header></Header>
      </el-header>

      <el-main>
        <!-- 放置内容组件 -->
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";

export default {
  components: {
    Aside,
    Header
  }
};
</script>

<style>

.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.pageContainer > .el-container {
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

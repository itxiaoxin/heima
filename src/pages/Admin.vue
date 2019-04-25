<template>
  <el-container>
    <el-aside width="200px">
      <!-- 放置侧边栏组件 -->
      <Aside></Aside>
    </el-aside>
    
    <el-container>
      <el-header>
        <!-- 放置头部组件 -->
      </el-header>

      <el-main>
        <!-- 放置内容组件 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "../components/Aside.vue";

export default {
  components: {
    Aside
  }
};
</script>

<style>

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  position:absolute;
  top:0;
  bottom:0;
  background-color: #545c64;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

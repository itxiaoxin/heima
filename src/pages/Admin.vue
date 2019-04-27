<template>
  <div class="pageContainer">
    <el-container>
      <el-aside width="auto">
        <!-- 放置侧边栏组件 -->
        <Aside :collapse="isCollapse"></Aside>
      </el-aside>

      <el-container>
        <el-header>
          <!-- 放置头部组件 -->
          <Header @changeCollapse="changeCollapse"></Header>
        </el-header>

        <el-main>
          <!-- 放置内容组件 -->
          <!-- 面包屑组件 -->
          <!-- <div>{{routerInfo.join('->')}}</div> -->
          <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in routerInfo">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 展示子组件 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";

export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    // 切换侧边栏状态
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  computed: {
    routerInfo() {
      // console.log(this.$route.matched);
      const arr = this.$route.matched.map(v => {
        return v.meta;
      });
      return arr;
    }
  },
  components: {
    Aside,
    Header
  }
};
</script>

<style>
.breadcrumb {
  padding:15px 0;
  border-bottom:1px solid #ccc;
}
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
}
.pageContainer > .el-container {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

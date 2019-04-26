<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="middle">
    <i class="el-icon-back" @click="handleClick"></i>
    <div>
      {{userName}} {{realname}}
      <span @click="handleLogout" class="logout">退出</span>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      realname: ""
    };
  },
  methods: {
    // 点击箭头，调用admin传递过来的的changeCollapse方法，控制左侧栏的展开和收起
    handleClick() {
      this.$emit("changeCollapse");
    },
    // 点击退出，注销登录
    handleLogout() {

      this.$axios({
        url: "/admin/account/logout",
        withCredentials: true
      }).then(result => {
        // console.log(result);
        const { status, message } = result.data;
        if (!status) {
          // 退出成功，清除本地存储，跳转到登录页
          localStorage.removeItem("userName");
          localStorage.removeItem("realname");          
          this.$router.replace("/login");
          this.$message({
            message: message,
            type: "success"
          });
        }
      });
    }
  },
  mounted() {
    // 页面加载，从本地存储获取用户信息，渲染到页面
    this.userName = localStorage.getItem("userName");
    this.realname = localStorage.getItem("realname");
  }
};
</script>

<style>
.logout {
    cursor:pointer;
}
</style>

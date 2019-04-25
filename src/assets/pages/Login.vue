<template>
  <el-row type="flex" justify="center" class="row-bg">
    <el-form ref="form" :model="form" label-width="80px" class="form">
      <div class="title">登录</div>
      <el-form-item label="帐号">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.upwd" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        uname: "",
        upwd: ""
      }
    };
  },
  methods: {
    //   登录提交
    onSubmit() {
        // 获取参数
        
    }
  }
};
</script>

<style>
.title {
  margin-bottom: 20px;
  padding-left:50px;
  color:#00a4ff;
}
.form {
  width: 400px;
  margin-top:10%;
  text-align:center;
}
</style>
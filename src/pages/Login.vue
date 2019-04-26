<template>
  <el-row type="flex" justify="center" class="row-bg">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">
      <div class="title">登录</div>

      <el-form-item label="帐号" prop="uname">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="upwd">
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
        uname: "admin",
        upwd: "123456"
      },
    //   表单验证
       rules: {
          uname: [
            { required: true, message: '请输入帐号', trigger: 'blur' },
          ],
          
          upwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度6-18个字符', trigger: 'blur' }
          ]
    }

  }},
  methods: {
    //   登录提交
    onSubmit() {
        // 表单数据验证
        this.$refs.form.validate(valid=>{
            if(!valid) return;
            
      // 如果通过验证，就发送请求
      this.$axios({
        url: "/admin/account/login",
        method: "POST",
        data: this.form,
        // 处理跨域请求的参数
        withCredentials:true
      }).then(result => {
        // console.log(result);
        const {status,message}=result.data
        // 登录成功，进入后台页面，把用户信息保存到本地存储
        if (status == 0) {
          this.$router.push("/");
          localStorage.setItem('userName',message.uname);
          localStorage.setItem('realname',message.realname);
        } else {
          this.$message({
            message:message,
            type: "error"
          });
        }
      });
        })


    }
  }
}
</script>

<style>
.title {
  margin-bottom: 20px;
  padding-left: 50px;
  color: #00a4ff;
}
.form {
  width: 400px;
  margin-top: 10%;
  text-align: center;
}
</style>
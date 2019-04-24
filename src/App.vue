<template>
  <div id="app">
hello vue
 <el-button type="danger" round>危险按钮</el-button>
 <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>

export default {
  data() {
    return {
      input: ''
    }
  },
  mounted(){
    this.$axios({
      url:'',//https://api.github.com/users
      method:'get',
      // type:'post';
      params:{},
      // data:{}      
    }).then(result=>{
      console.log(result)
    })
  }
}
</script>

<style>
</style>

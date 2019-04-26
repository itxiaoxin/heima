<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      
        <i class="el-icon-back" @click="handleClick"></i>
        <div>
            admin 超级管理员
            <span>退出</span>
        </div>


  </el-row>
</template>

<script>
export default {

    methods:{
        // 点击箭头，调用admin传递过来的的changeCollapse方法，控制左侧栏的展开和收起
        handleClick(){
            this.$emit('changeCollapse')
        }
    }
    }

</script>

<style>
</style>

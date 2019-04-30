<template>
  <div>
    <el-row type="flex" align="middle" style="margin-bottom: 15px;">
      <el-col>
        <el-button>新增</el-button>
        <el-button>删除</el-button>
      </el-col>
    </el-row>

    <el-tree :data="data" show-checkbox :default-expand-all="false" expand-on-click-node>
      <span class="custom-tree-node" slot-scope="{ data }">
        <span>{{ data.title }}</span>
        <span>
          <el-button type="text" size="mini">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
let id = 1000;

export default {
  data() {
    return {
     data:[]
    };
  },
  mounted() {
    // 获取所有分类数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      // console.log(res);
      const { message } = res.data;
      // console.log(message);

      // 判断是否有子选项的分类

      // 使用递归的方式实现-----------------------------------------------

      let arr = [];

      // 递归函数，循环判断是否有子选项
      function loop(arr, v) {
        // console.log(arr,v)
        arr.forEach((val, index) => {
          if (val.category_id == v.parent_id) {
            if (!val.children) {
              val.children = [];
            }
            val.children.push(v);
            return;
          } else {
             // 如果上面的循环找不到父元素，并且当前的元素还有子选项，继续往选项中查找
            if (val.children) {
              loop(val.children, v);
            }
          }
        });
      }

      message.forEach((v, i) => {
        // 判断是否是顶级
        if (v.parent_id == 0) {
          // 如果是顶级栏目，直接把栏目添加到arr第一层
          arr.push(v);
        } else {
          // 如果不是顶级，交给递归函数去判断是哪一个栏目的子选项
          loop(arr, v);
        }
      });
      this.data = arr;
      // console.log(this.data);
    });
  },

  methods: {}
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

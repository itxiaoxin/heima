<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col>
        <el-button>新增</el-button>
        <el-button @click="deleteGoods">删除</el-button>
      </el-col>
      <div style="margin: 15px 0;">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- 商品列表数据 -->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 多选 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="标题">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl">
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column prop="categoryname" label="类型" width="180"></el-table-column>
      <el-table-column prop="market_price" label="价格" width="180"></el-table-column>

      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],   
       //提交删除商品请求的参数
      ids:''           
    };
  },

  methods: {
    // 渲染商品列表--封装
    getGoodsList() {
      //  请求商品列表数据
      this.$axios({
        url: "/admin/goods/getlist?pageIndex=1&pageSize=10",
        withCredentials: true
      }).then(res => {
        // console.log(res.data.message)
        this.tableData = res.data.message;
      });
    },

    handleEdit(index, row) {
      console.log(index, row);
    },

    // 删除单个商品
    handleDelete(row) {
      //   console.log(row);
      // 提交删除商品请求的参数
      this.ids = row.id;
      this.deleteGoods()
    },

    // 删除商品
    deleteGoods(){
        // 询问是否删除
      this.$confirm("确认删除商品？").then(_ => {
        this.$axios({
          url: `/admin/goods/del/${this.ids}`,
          widthCredentials: true
        }).then(res => {
          const { status, message } = res.data;
          if (!status) {
            //  删除成功后的提示
            this.$message({
              message: message,
              type: "success"
            });
            // 删除成功之后重新渲染列表
            this.getGoodsList();
          }
        });
      });
    },

    // 多选选择的时候触发
    handleSelectionChange(val) {
      this.multipleSelection = val;
    //   获取选择商品的id并将其转成接口文档要求的格式
      this.ids=val.map(v=>{
          return v.id
      }).join(',')
    },

    },

  mounted() {
    //   页面加载渲染列表
    this.getGoodsList();
  }
};
</script>

<style>
img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
</style>

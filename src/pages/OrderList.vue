<template>
  <div>
    <el-row type="flex" align="middle" style="margin-bottom: 15px;">
      <el-col>
        <el-button @click="$router.push('/admin/goods-add')">新增
          <!-- <router-link to="./goods-add">新增</router-link> -->
          </el-button>
        <el-button @click="deleteGoods">删除</el-button>
      </el-col>
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="searchvalue"
          class="input-with-select"
          @keyup.enter.native="handleSearchGoods"
        >
          <el-button slot="append" icon="el-icon-search" @click="handleSearchGoods"></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- 商品列表数据 -->
    <el-table :data="tableData" style="width: 100%;margin-bottom:20px" @selection-change="handleSelectionChange">
      <!-- 多选 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="categoryname" label="订单ID" width="180"></el-table-column>
      <el-table-column prop="categoryname" label="会员名称" width="180"></el-table-column>
      <el-table-column prop="categoryname" label="地址" width="180"></el-table-column>
      <el-table-column prop="market_price" label="快递" width="180"></el-table-column>
      <el-table-column prop="categoryname" label="状态" width="180"></el-table-column>

      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <!-- layout分页的布局，调整里面值的顺序可以改变分页的页面结构布局 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalcount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData: [],
      //商品id -- 请求删除商品提交的参数
      ids: "",
    //  搜索内容
      searchvalue: "",
      // 页码  -- 请求商品列表提交的参数
      pageIndex:1,

    //   总条目数，每页显示的条目数，每页显示个数的选项设置
      totalcount:0, 
      pageSize:5,
      pageSizes:[5,10],    
      
    };
  },

  methods: {
  
    // 渲染商品列表--封装
    getGoodsList() {
      //  请求商品列表数据
      this.$axios({
        url: `/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${
          this.searchvalue
        }`,
        withCredentials: true
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.message;
        this.totalcount=res.data.totalcount
      });
    },

    handleEdit( row) {
      // console.log(row);
      this.$router.push(`/admin/goods-edit/${row.id}`)
    },

    // 删除单个商品
    handleDelete(row) {
      //   console.log(row);
      // 提交删除商品请求的参数
      this.ids = row.id;
      this.deleteGoods();
    },

    // 删除商品
    deleteGoods() {
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
      this.ids = val
        .map(v => {
          return v.id;
        })
        .join(",");
    },

    // 搜索商品
    handleSearchGoods() {
     this.getGoodsList();
    },

    /*   分页业务   */    
    // pageSize 改变时会触发，改变每页显示的条目数
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize=val;
        this.getGoodsList();
      },
    // currentPage 改变时会触发，切换当前页
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageIndex=val;
        this.getGoodsList();
      }


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

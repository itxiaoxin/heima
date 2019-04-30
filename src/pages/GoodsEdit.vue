<template>
  <div>
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择">
          <el-option
            :label="item.title"
            :value="item.category_id"
            v-for="(item,index) in categories"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>

      <el-form-item label="推荐类型">
        <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
      </el-form-item>

      <el-form-item label="内容标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="副标题">
        <el-input v-model="form.sub_title"></el-input>
      </el-form-item>

      <!-- 封面图片 -->
      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8899/admin/article/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
        <!-- 预览图片 ,默认为空-->
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
      </el-form-item>

      <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
      </el-form-item>

      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>

      <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
      </el-form-item>

      <!-- 图片相册 -->
      <el-form-item label="图片相册">
        <el-upload
          action="http://localhost:8899/admin/article/uploadimg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleImageSuccess"
          :file-list="form.fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>

      <el-form-item label="内容摘要">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
      </el-form-item>

      <el-form-item label="内容描述">
        <quillEditor v-model="form.content"></quillEditor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      form: {
        category_id: "",
        status: true,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        zhaiyao: "",
        content: "",
        is_slide: false,
        imgList: [],
        fileList: []
      },

      categories: [],

      imageUrl: "", //预览图片

      dialogImageUrl: "",
      dialogVisible: false,

      value: "" //输入框中的默认内容
    };
  },
  methods: {
    // 提交数据
    onSubmit() {
      console.log(this.form);
      // 发送请求，提交数据
      this.$axios({
        url: `/admin/goods/edit/${this.$route.params.id}`,
        method: "POST",
        data: this.form,
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data;
        // 商品添加成功后跳转到商品列表页
        if (status == 0) {
          this.$router.back();
          // 成功提示
          this.$message({
            message,
            type: "success"
          });
        }
      });
    },

    // 封面图片
    // 上传成功时触发
    // res当前图片的基本信息，file当前图片的全部信息
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(res,file)
      this.form.imgList = [res];
    },
    // 上传之前触发
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    // 图片相册
    // 上传成功时触发
    // res当前图片的基本数据，file当前图片的全部数据，fileList数组，上传成功的全部图片的数据列表
    handleImageSuccess(res, file, fileList) {
      // console.log(res,file,fileList)
      this.form.fileList = fileList;
      // console.log(this.form.fileList)
    },
    // 移除文件时触发
    // file被删除的文件的数据，fileList当前剩下的全部文件的数据
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.form.fileList= fileList;
    },
    // 点击图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    // 获取所有分类数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      // console.log(res);
      this.categories = res.data.message.map(v => {
        return {
          category_id: v.category_id,
          title: v.title
        };
      });
      // console.log(this.categories)
    });

  //  根据路由获取当前id
    const {id} = this.$route.params;

     // 获取当前商品的数据
    this.$axios({
      url:`/admin/goods/getgoodsmodel/${id}`
    }).then(res => {
      // console.log(res);
      const {message}= res.data;
      // 设置封面图片的预览图片
      this.imageUrl=message.imgList[0].url;

      // 拼接图片路径，后台返回的路径有问题
      this.form={
        ...message,
        fileList:message.fileList.map(v=>{
          return {
            ...v,
            url:`http://localhost:8899${v.shorturl}`
          }
        })
      }

    });
  },

  components: {
    quillEditor
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
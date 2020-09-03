<template>
  <div id="goodsadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品添加</span>
      </div>
      <div>
        <span style="margin-right:10px">商品名称:</span>
        <el-input v-model="name" placeholder="商品名称"></el-input>
      </div>
      <div>
        <span style="margin-right:10px">商品分类:</span>
        <el-select v-model="cate" placeholder="请选择商品分类" :value="cate.cateName">
          <el-option
            v-for="item in options"
            :key="item.cateName"
            :label="item.label"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </div>
      <div>
        <span style="margin-right:10px">商品价格:</span>
        <el-input-number v-model="price" @change="handleChange" :min="1" label="描述文字"></el-input-number>
      </div>
      <div class="group">
        <span style="margin-right:10px">商品图片:</span>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="baseUrl+imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div style="height:50px;line-height:50px;margin-bottom:30px">
        <span style="margin-right:10px;display:inline-block;line-height:20px">商品描述:</span>
        <el-input type="textarea" :rows="2" v-model="goodsDesc" style="width: 400px;"></el-input>
      </div>
      <div>
        <el-button type="primary" @click.native="addBtn">点击添加</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { goodsCate, addgoods } from "@/api/api";
export default {
  data() {
    return {
      name: "",
      options: [],
      price: 1,
      imageUrl: "",
      cate: "",
      goodsDesc: "",
      baseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
    };
  },
  methods: {
    addBtn() {
      addgoods(
        this.name,
        this.cate,
        this.price,
        this.imageUrl,
        this.goodsDesc
      ).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.$router.push("/goods/goodslist");
        }
      });
    },
    handleChange() {},
    handleAvatarSuccess(res) {
      console.log(res);
      if (res.code== 0) {
        this.imageUrl = res.imgUrl;
        console.log(this.imageUrl)
      }
      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"||"webp";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    checkGoodsCate() {
      goodsCate().then((res) => {
        this.options = res.data.categories;
      this.cate=res.data.categories[0].cateName
      });
    },
  },
  created() {
    this.checkGoodsCate();
  },
};
</script>

<style lang="less" scoped>
#goodsadd {
  width: 100%;
  height: 100%;
  .box-card {
    width: 100%;
    height: 700px;
  }
  .el-input {
    width: 400px;
  }
  div {
    margin-top: 15px;
  }
  .group {
    display: flex;
    span {
      flex: 0 0 120px;
    }
    .el-upload {
      flex: 1;
    }
  }
}
.avatar-uploader {
  width: 178px !important;
  height: 178px !important;
  margin: 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9 !important;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>
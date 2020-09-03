<template>
  <div id="goodsadd">
    <el-card>
      <div slot="header" class="clearfix">
        <span>店铺名称</span>
        <el-button
          style="float: right;"
          size="small"
          @click="clickbtn"
          :type="isEdit?'success':'primary'"
        >{{isEdit?'完成':'编辑'}}</el-button>
      </div>
      <el-form :disabled="!isEdit">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="商品公告">
          <el-input type="textarea" :rows="5" v-model="form.bulletin" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
            <img :src="form.avatar==''?'':imgBaseUrl+form.avatar" class="avatar" style="width:200px" />
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            list-type="picture-card"
            action="http://127.0.0.1:5000/shop/upload"
            :file-list="filelist"
            :on-success="handleImgSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="form.deliveryPrice" style="width:350px;margin-left:12px"></el-input>
        </el-form-item>
        <el-form-item label="送达时间">
          <el-input v-model="form.deliveryTime" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="form.description" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-rate v-model="form.score" show-text style="margin-top:10px"></el-rate>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="form.sellCount" style="width:350px;margin-left:22px"></el-input>
        </el-form-item>
        <!-- 活动 -->
        <el-form-item label="活动">
          <el-checkbox-group v-model="form.supports">
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            <el-checkbox label="多人精彩套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="form.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getShopInfo, editShop } from "@/api/api";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      isIndeterminate: true,
      form: {
        name: "",
        bulletin: "",

        // 头像
        avatar: "",
        // 图片
        pics: [],

        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: 1,
        sellCount: "",
        supports: [],
        date: [],
      },
      checkList: ["选中且禁用", "复选框 A"],
      isEdit: false,
      imgBaseUrl: "http://127.0.0.1:5000/upload/shop/",
      filelist: [],
    };
  },
  methods: {
    handleChange() {},
    handleAvatarSuccess(res) {
      // console.log(res);
      this.form.avatar =res.imgUrl;
    },
    handleImgSuccess(res) { 
      this.form.pics.push(res.imgUrl)
    },
    handlePreview() {},
    handleRemove(res) {
      this.form.pics.splice(this.form.pics.indexOf(this.form.pics.name),1)
      console.log(this.filelist)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    clickbtn() {
      this.isEdit = !this.isEdit;
      if (!this.isEdit) {
        let supportsMsg=JSON.parse(JSON.stringify(this.form.supports))
        let dateMsg=JSON.parse(JSON.stringify(this.form.date))
        let pics=JSON.parse(JSON.stringify(this.form.pics))
        editShop({
          id: this.form.id,
          name: this.form.name,
          bulletin: this.form.bulletin,
          avatar: this.form.avatar,
          deliveryPrice: this.form.deliveryPrice,
          deliveryTime:this.form.deliveryTime,
          description:this.form.description,
          score:this.form.score,
          sellCount:this.form.sellCount,
          supports:JSON.stringify(supportsMsg),
          date:JSON.stringify(dateMsg),
          pics:JSON.stringify(pics)
        }).then((res) => {
        this.getShopMsg()
        });
      }
    },
    getShopMsg(){
       getShopInfo().then((res) => {
      let str = JSON.stringify(res.data.data.pics);
      let obj = JSON.parse(str);
      this.filelist = obj.map((v) => ({name:v, url: this.imgBaseUrl + v }));
      res.data.data.isEdit = false;
      // console.log(this.filelist);
      this.form = res.data.data;
    });
    }
  },
  created() {
  this.getShopMsg()
  console.log(11111)
  },
};
</script>

<style lang="less" scoped>
.el-form-item__content {
  line-height: 0px;
 
}
 .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    &:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
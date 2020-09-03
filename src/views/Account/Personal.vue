<template>
  <div id="personal">
    <p>管理员信息</p>
    <p>管理员ID：{{accountInfo.id}}</p>
    <p>账号：{{accountInfo.account}}</p>
    <p>用户组：{{accountInfo.userGroup}}</p>
    <p>创建时间：{{accountInfo.ctime}}</p>
    <div class="group">
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        style="margin-top:20px"
        :data="uploaddata"
      >
        <div class="group-item">
          <span class="groupAvatar">管理员头像：</span>
          <img v-if="accountInfo.imgUrl" :src="accountInfo.imgUrl" class="avatar" />
        </div>
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
    </div>
  </div>
</template>

<script>
import { personalMsg } from "@/api/api";
import moment from "moment";
export default {
  data() {
    return {
      accountInfo: {
        id: "",
        account: "",
        userGroup: "",
        ctime: "",
        imgUrl: "",
      },
      uploaddata: {},
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.accountInfo.imgUrl = res.imgUrl;
      if (res.code == 0) {
        this.fetchData();
        this.$bus.$emit("imguploadfinish");
      }
    },
    beforeAvatarUpload() {},
    fetchData() {
      personalMsg(localStorage.getItem("ids")).then((res) => {
        // console.log(res);
        this.accountInfo = res.data.accountInfo;
        res.data.accountInfo.ctime = moment(res.data.accountInfo.ctime).format(
          "YYYY/MM/DD HH:mm:ss"
        );
        // this.fetchData()
      });
    },
  },
  created() {
    this.fetchData();
    this.uploaddata = { id: localStorage.ids };
  },
};
</script>

<style lang="less" scoped>
#personal {
  width: 100%;
  height: 550px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  p {
    padding-left: 10px;
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    line-height: 50px;
  }
}
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
.group-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 178px;
}
</style>